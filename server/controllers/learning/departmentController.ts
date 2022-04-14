import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  ICreateDepartmentBody,
  ICreateSemesterBody,
  ISemester,
  IUpdateDepartmentBody,
} from "../../../shared/types/learning";
import Course from "../../database/models/learning/Course";
import Department from "../../database/models/learning/Department";
import Material from "../../database/models/learning/Material";
import University from "../../database/models/learning/University";

const updateOpt = { new: true, omitUndefined: true };

// Create
const createDepartment = async (req: Request, res: Response) => {
  const { name, abbr, totalSemesters, semesters }: ICreateDepartmentBody =
    req.body;
  const { universityId } = req.params;

  // check semesters provided and totalSemesters
  if (semesters.length !== totalSemesters)
    return res.status(400).json({
      message: `Please provide ${totalSemesters} semesters`,
    });

  // check unique semester names
  const sems = semesters.map((sem) => sem.name);
  const uniqueSems = sems.filter((val: string, i: number, arr: string[]) => {
    return arr.indexOf(val) === i;
  });
  if (sems.length !== uniqueSems.length)
    return res.status(400).json({ message: "Semester names should be unique" });

  const university = await University.findOne({ _id: universityId });
  if (!university)
    return res.status(404).json({ message: "University not found" });

  // check for dept name and abbr under university
  const deptFound = await Department.findOne({
    $or: [{ name }, { abbr }],
    $and: [{ universityId }],
  });
  if (deptFound)
    return res.status(400).json({
      message: `Department with name or abbreviation already exists in ${university.name}`,
    });

  const slug = `${university.abbr}~${abbr}`; // slug: uni~dept

  const newDept = new Department({
    name,
    abbr,
    totalSemesters,
    semesters,
    slug,
    universityId,
  });

  const [department] = await Promise.all([
    newDept.save(),
    // university totalDepartments increment
    University.findOneAndUpdate(
      { _id: universityId },
      { $inc: { totalDepartments: 1 } },
      updateOpt
    ),
  ]);

  return res.status(200).json(department);
};

// Update
const updateDepartment = async (req: Request, res: Response) => {
  const { name, abbr, totalSemesters, semesters }: IUpdateDepartmentBody =
    req.body;
  const { departmentId } = req.params;

  const query = { _id: departmentId };

  const dept = await Department.findOne(query);
  if (!dept) return res.status(404).json({ message: "Department not found" });

  // check semesters provided and totalSemesters
  if (semesters || totalSemesters) {
    if (!semesters || semesters.length !== totalSemesters)
      return res.status(404).json({
        message: `Please provide ${totalSemesters} semesters`,
      });

    // check unique semester names
    const sems = semesters.map((sem) => sem.name);
    const uniqueSems = sems.filter(
      (val: string, i: number, arr: string[]) => arr.indexOf(val) === i
    );
    if (sems.length !== uniqueSems.length)
      return res.status(400).json({
        message: "Semester names should be unique",
      });

    const oldSemesterIds: string[] = (
      dept.semesters as unknown as ISemester[]
    ).map((sem) => sem._id);
    const newSemesterIds: string[] = (semesters as ISemester[]).map(
      (sem) => sem._id
    );
    // deleted a semester
    if (totalSemesters < dept.totalSemesters) {
      const deletedIds: string[] = oldSemesterIds.filter(
        (id) => !newSemesterIds.includes(id)
      );

      deletedIds.forEach((id) => {
        const deleted = dept.semesters.find((sem) => sem._id === id);
        if (deleted?.hasMaterial) {
          return res.status(400).json({
            message: `${deleted.name} cannot be deleted as it has materials`,
          });
        }
      });
      // Delete courses
      await Course.deleteMany({ semesterId: { $in: deletedIds } });
    } else {
      // semester name change check && course slugs change
      const nameChangeArr: ICreateSemesterBody[] = [];
      dept.semesters.forEach((sem) => {
        semesters.forEach((ns) => {
          if (ns._id === sem._id) {
            if (ns.name !== sem.name) {
              nameChangeArr.push(ns);
            }
          }
        });
      });
      if (nameChangeArr.length) {
        // const nsIds: string[] = nameChangeArr.map((s) => s._id as string);
        nameChangeArr.forEach(async (sem) => {
          const bulkArr: any[] = [];
          const courses = await Course.find({
            departmentId,
            semesterId: sem._id,
          });
          for (const cr of courses) {
            bulkArr.push({
              updateOne: {
                filter: { _id: cr._id },
                update: {
                  $set: {
                    slug: `${cr.slug.split("~").slice(0, 2).join("~")}~${
                      sem.name
                    }~${cr.slug.split("~")[3]}`,
                  },
                },
              },
            });
          }
          await Department.bulkWrite(bulkArr, { ordered: false });
        });
      }
    }
  }

  // check for dept name and abbr under university
  const universityId = dept.universityId;
  if (name !== dept.name) {
    const deptN = await Department.findOne({ name, universityId });
    if (deptN)
      return res.status(400).json({
        message: `Department with name already exists under this university`,
      });
  }
  const abbreviation = abbr?.toLowerCase();
  if (abbreviation && abbreviation !== dept.abbr) {
    const deptA = await Department.findOne({
      abbr: abbreviation,
      universityId,
    });
    if (deptA)
      return res.status(400).json({
        message: `Department with abbreviation(${abbreviation}) already exists under this university`,
        deptA,
      });

    // if abbr changes, change course slugs
    const bulkArr: any[] = [];
    const courses = await Course.find({ departmentId });
    for (const cr of courses) {
      bulkArr.push({
        updateOne: {
          filter: { _id: cr._id },
          update: {
            $set: {
              slug: `${cr.slug.split("~")[0]}~${abbreviation}~${cr.slug
                .split("~")
                .slice(2, 4)
                .join("~")}`,
            },
          },
        },
      });
    }
    await Department.bulkWrite(bulkArr, { ordered: false });
  }

  const slug = abbreviation
    ? `${dept.slug.split("~")[0]}~${abbreviation}`
    : dept.slug;

  const newSems = semesters?.map((s) => {
    if (mongoose.isValidObjectId(s._id)) return s;
    return { name: s.name };
  });

  const updatedDepartment = await Department.findOneAndUpdate(
    query,
    { $set: { name, abbr, totalSemesters, semesters: newSems, slug } },
    updateOpt
  );
  return res.status(200).json(updatedDepartment);
};

// Delete
const deleteDepartment = async (req: Request, res: Response) => {
  const { departmentId } = req.params;

  const query = { _id: departmentId };

  const dept = await Department.findOne(query);
  if (!dept) return res.status(404).json({ message: "Department not found" });

  await Promise.all([
    Course.deleteMany({ departmentId }),
    Material.deleteMany({ departmentId }),
    Department.findOneAndDelete(query),
    University.findOneAndUpdate(
      { _id: dept.universityId },
      { $inc: { totalDepartments: -1 } },
      updateOpt
    ),
  ]);

  return res.status(200).json({ message: "success" });
};

// Get All
const getAllDepartmentsByUniversity = async (req: Request, res: Response) => {
  const { universityId } = req.params;
  const departments = await Department.find({ universityId });
  return res.status(200).json(departments);
};

const getDepartmentsByUniversityAbbr = async (req: Request, res: Response) => {
  const { universityAbbr } = req.params;
  const regex = new RegExp(`^${universityAbbr}`, "i");
  const departments = await Department.find({ slug: { $regex: regex } });
  return res.status(200).json(departments);
};

// Get Single
const getDepartment = async (req: Request, res: Response) => {
  const { departmentId } = req.params;

  const department = await Department.findOne({ _id: departmentId });
  if (!department)
    return res.status(404).json({ message: "Department not found" });

  return res.status(200).json(department);
};

const getDepartmentBySlug = async (req: Request, res: Response) => {
  const { departmentSlug } = req.params; // departmentSlug: uni~dept

  const department = await Department.findOne({ slug: departmentSlug });
  if (!department)
    return res.status(404).json({ message: "Department not found" });

  return res.status(200).json(department);
};

const getSemesterById = async (req: Request, res: Response) => {
  const { semesterId } = req.params;

  const department = await Department.findOne(
    {
      semesters: { $elemMatch: { _id: semesterId } },
    },
    {
      semesters: { $elemMatch: { _id: semesterId } },
    }
  );
  if (!department)
    return res.status(404).json({ message: "Department not found" });

  return res.status(200).json(department.semesters[0]);
};

const getSemesterBySlug = async (req: Request, res: Response) => {
  const { semesterSlug } = req.params; // uni~dept~semester

  const departmentSlug = semesterSlug.split("~").slice(0, 2).join("~");
  const semesterName = semesterSlug.split("~").splice(2, 1)[0];

  const department = await Department.findOne(
    { slug: departmentSlug },
    { semesters: { $elemMatch: { name: semesterName } } }
  );
  if (!department)
    return res.status(404).json({ message: "Department not found" });

  return res.status(200).json(department.semesters[0]);
};

export default {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartmentsByUniversity,
  getDepartmentsByUniversityAbbr,
  getDepartment,
  getDepartmentBySlug,
  getSemesterById,
  getSemesterBySlug,
};
