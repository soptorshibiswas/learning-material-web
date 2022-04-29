import { Request, Response } from "express";
import {
  ICreateCourseBody,
  IUpdateCourseBody,
} from "../../../shared/types/learning";
import Course from "../../database/models/learning/Course";
import Department from "../../database/models/learning/Department";
import Material from "../../database/models/learning/Material";
import University from "../../database/models/learning/University";

const updateOpt = { new: true, omitUndefined: true };

// Create
const createCourse = async (req: Request, res: Response) => {
  const { name, type, code }: ICreateCourseBody = req.body;
  const { semesterId } = req.params;

  const department = await Department.findOne({
    semesters: { $elemMatch: { _id: semesterId } },
  });
  if (!department)
    return res.status(404).json({ message: "Department/Semester not found" });

  const semester = department.semesters.find(
    (sem) => sem._id?.toString() === semesterId
  );
  const university = await University.findOne({ _id: department.universityId });
  if (!university || !semester)
    return res.status(500).json({ message: "Something went wrong" });

  const courseFind = await Course.findOne({
    $or: [{ name }, { code }],
    $and: [{ semesterId }],
  });
  if (courseFind)
    return res.status(400).json({
      message: "Course with same name or code exists in this semester",
    });

  const slug = `${department.slug}~${semester.name}~${name}`;

  const newCourse = new Course({
    name,
    type,
    code,
    slug,
    semesterId,
    departmentId: department._id,
    universityId: department.universityId,
  });
  const course = await newCourse.save();
  return res.status(201).json(course);
};

// Update
const updateCourse = async (req: Request, res: Response) => {
  const { name, type, code }: IUpdateCourseBody = req.body;
  const { courseId } = req.params;
  let slug: string | undefined = undefined;

  const query = { _id: courseId };

  const course = await Course.findOne(query);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const semesterId = course.semesterId;

  const department = await Department.findOne({
    "semesters._id": semesterId,
  });
  if (!department)
    return res.status(404).json({ message: "Department/Semester not found" });

  const semester = department.semesters.find(
    (sem) => sem._id?.toString() === semesterId.toString()
  );

  if (!semester)
    return res.status(500).json({ message: "Something went wrong" });

  if (name !== course.name) {
    const courseN = await Course.findOne({ name, semesterId });
    if (courseN)
      return res.status(400).json({
        message: "Course with same name exists in this semester",
      });

    slug = `${course.slug.split("~").slice(0, 2).join("~")}~${semester.name
      }~${name}`;

    // change material slugs
    const bulkArr: any[] = [];
    const materials = await Material.find({ courseId });
    for (const mt of materials) {
      bulkArr.push({
        updateOne: {
          filter: { _id: mt._id },
          update: { $set: { courseSlug: slug } },
        },
      });
    }
    await Material.bulkWrite(bulkArr, { ordered: false });
  }
  if (code !== course.code) {
    const courseC = await Course.findOne({ code, semesterId });
    if (courseC)
      return res.status(400).json({
        message: "Course with same code exists in this semester",
      });
  }

  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { name, type, code, slug },
    updateOpt
  );
  return res.status(200).json(updatedCourse);
};

// Delete
const deleteCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const query = { _id: courseId };

  const material = await Material.findOne({ courseId });
  if (material)
    return res.status(400).json({ message: "Cannot delete Course" });

  const course = await Course.findOne(query);
  if (!course) return res.status(404).json({ message: "Course not found" });

  await Promise.all([
    Material.deleteMany({ courseId }),
    Course.findOneAndDelete(query),
  ]);

  return res.status(200).json({ message: "success" });
};

// Get All
const getAllCoursesBySemester = async (req: Request, res: Response) => {
  const { semesterId } = req.params;
  const courses = await Course.find({ semesterId });
  return res.status(200).json(courses);
};

const getCoursesBySemesterSlug = async (req: Request, res: Response) => {
  const { semesterSlug } = req.params;
  const regex = new RegExp(`^${semesterSlug}`, "i");
  const courses = await Course.find({ slug: { $regex: regex } });
  return res.status(200).json(courses);
};

// Get Single
const getCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const course = await Course.findOne({ _id: courseId });
  if (!course) return res.status(404).json({ message: "Course not found" });
  return res.status(200).json(course);
};

const getCourseBySlug = async (req: Request, res: Response) => {
  const { courseSlug } = req.params;
  const regex = new RegExp(courseSlug, "i");
  const course = await Course.findOne({ slug: { $regex: regex } });
  if (!course) return res.status(404).json({ message: "Course not found" });
  return res.status(200).json(course);
};

export default {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCoursesBySemester,
  getCoursesBySemesterSlug,
  getCourse,
  getCourseBySlug,
};
