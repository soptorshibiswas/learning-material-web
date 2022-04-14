import mongoose, { Schema, Document } from "mongoose";
import { TCourseType, courseTypes } from "../../../../shared/types/learning";
import Department from "./Department";
import University from "./University";

export interface ICourseModel {
  name: string;
  type: TCourseType;
  code: string;
  semesterId: string | Schema.Types.ObjectId; // ref
  departmentId: string | Schema.Types.ObjectId; // ref
  universityId: string | Schema.Types.ObjectId; // ref
  slug: string; // uni/dept/semester
}

interface ICourseDocument extends ICourseModel, Document {}

const CourseSchema = new Schema<ICourseDocument>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: courseTypes,
  },
  code: {
    type: String,
    lowercase: true,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
  semesterId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Department,
  },
  universityId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: University,
  },
});

const Course = mongoose.model<ICourseDocument>("courses", CourseSchema);

export default Course;
