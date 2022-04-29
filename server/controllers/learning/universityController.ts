import { Request, Response } from "express";
import {
  IUniversity,
  ICreateUniversityBody,
  IUpdateUniversityBody,
} from "../../../shared/types/learning";
import Course from "../../database/models/learning/Course";
import Department from "../../database/models/learning/Department";
import Material from "../../database/models/learning/Material";
import University from "../../database/models/learning/University";

const updateOpt = { new: true, omitUndefined: true };

// Create
const createUniversity = async (req: Request, res: Response) => {
  const { name, abbr }: ICreateUniversityBody = req.body;

  const varsityFound = await University.findOne({ $or: [{ name }, { abbr }] });
  if (varsityFound)
    return res.status(400).json({
      message: "University already exists with the name or abbreviation",
    });

  const newVarsity = new University({
    name,
    abbr,
    totalDepartments: 0,
  });

  const university = await newVarsity.save();
  return res.status(201).json(university);
};

// Update
const updateUniversity = async (req: Request, res: Response) => {
  const { name, abbr }: IUpdateUniversityBody = req.body;
  const { universityId } = req.params;

  const query = { _id: universityId };

  const varsity = await University.findOne(query);
  if (!varsity)
    return res.status(404).json({ message: "University not found" });

  let varsityFound: IUniversity | null = null;
  if (name !== varsity.name) {
    varsityFound = await University.findOne({ name });
    if (varsityFound)
      return res.status(400).json({
        message: "University already exists with that name",
      });
  }
  if (abbr && abbr !== varsity.abbr) {
    varsityFound = await University.findOne({
      abbr: { $regex: new RegExp(abbr, "i") },
    });
    if (varsityFound)
      return res.status(400).json({
        message: "University already exists with that abbreviation",
      });

    // if abbr changes, change department slugs
    const bulkArr: any[] = [];
    const departments = await Department.find({ universityId });
    for (const dept of departments) {
      bulkArr.push({
        updateOne: {
          filter: { _id: dept._id },
          update: { $set: { slug: `${abbr}~${dept.abbr}` } },
        },
      });
    }
    await Department.bulkWrite(bulkArr, { ordered: false });
  }

  const updatedUniversity = await University.findOneAndUpdate(
    query,
    { name, abbr },
    updateOpt
  );
  return res.status(200).json(updatedUniversity);
};

// Delete
const deleteUniversity = async (req: Request, res: Response) => {
  const { universityId } = req.params;

  const query = { _id: universityId };

  const varsity = await University.findOne(query);
  if (!varsity)
    return res.status(404).json({ message: "University not found" });

  /**
   * delete all departments, course, material of university
   */
  await Promise.all([
    Department.deleteMany({ universityId }),
    Course.deleteMany({ universityId }),
    Material.deleteMany({ universityId }),
    University.findOneAndDelete(query),
  ]);

  return res.status(200).json({ message: "success" });
};

// Get All
const getAllUniversities = async (_req: Request, res: Response) => {
  const universities = await University.find({});
  return res.status(200).json(universities);
};

// Get Single
const getUniversityById = async (req: Request, res: Response) => {
  const { universityId } = req.params;

  const university = await University.findOne({ _id: universityId });
  if (!university)
    return res.status(404).json({ message: "University not found" });

  return res.status(200).json(university);
};

const getUniversityByAbbr = async (req: Request, res: Response) => {
  const { abbr } = req.params;

  const university = await University.findOne({
    abbr: { $regex: new RegExp(abbr, "i") },
  });
  if (!university)
    return res.status(404).json({ message: "University not found" });

  return res.status(200).json(university);
};

const getStats = async (_req: Request, res: Response) => {
  const [totalUniversity, totalResources, totalQnA] = await Promise.all([
    await University.countDocuments({}),
    await Material.countDocuments({
      $or: [{ type: "refBook" }, { type: "lectureNote" }],
    }),
    await Material.countDocuments({ type: "question" }),
  ]);

  return res.status(200).json({ totalUniversity, totalResources, totalQnA });
};

export default {
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversityById,
  getUniversityByAbbr,
  getStats,
};
