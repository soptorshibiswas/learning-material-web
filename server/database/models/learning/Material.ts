import mongoose, { Schema, Document } from "mongoose";
import {
  TMaterialType,
  materialTypes,
} from "../../../../shared/types/learning";
import Course from "./Course";
import Department from "./Department";
import University from "./University";

interface IMaterialModel {
  type: TMaterialType;
  file: string;
  name?: string;
  sessionYear?: string;
  author?: string;
  courseCode?: string;
  courseSlug: string;
  courseId: string | Schema.Types.ObjectId; // ref
  semesterId: string | Schema.Types.ObjectId; // ref
  departmentId: string | Schema.Types.ObjectId; // ref
  universityId: string | Schema.Types.ObjectId; // ref
}
interface IMaterialDocument extends IMaterialModel, Document {}

const MaterialSchema = new Schema<IMaterialDocument>({
  type: {
    type: String,
    enum: materialTypes,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  sessionYear: {
    type: String,
  },
  author: {
    type: String,
  },
  courseCode: {
    type: String,
  },
  courseSlug: {
    type: String,
    lowercase: true,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Course,
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

const Material = mongoose.model<IMaterialDocument>("materials", MaterialSchema);

export default Material;
