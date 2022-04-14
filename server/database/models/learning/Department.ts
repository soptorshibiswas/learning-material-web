import mongoose, { Schema, Document } from "mongoose";
import University from "./University";

export interface ISemesterModel {
  _id?: string;
  name: string;
  hasMaterial: boolean;
}

const SemesterSchema = new Schema<ISemesterModel>(
  {
    name: {
      type: String,
      required: true,
    },
    hasMaterial: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: true }
);

export interface IDepartmentModel {
  name: string;
  abbr: string;
  totalSemesters: number;
  semesters: ISemesterModel[];
  slug: string;
  universityId: string | Schema.Types.ObjectId; // ref
}

interface IDepartmentDocument extends IDepartmentModel, Document {}

const DepartmentSchema = new Schema<IDepartmentDocument>({
  name: {
    type: String,
    required: true,
  },
  abbr: {
    type: String,
    lowercase: true,
    required: true,
  },
  totalSemesters: {
    type: Number,
    required: true,
  },
  semesters: [
    {
      type: SemesterSchema,
    },
  ],
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
  universityId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: University,
  },
});

const Department = mongoose.model<IDepartmentDocument>(
  "departments",
  DepartmentSchema
);

export default Department;
