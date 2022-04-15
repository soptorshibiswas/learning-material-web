import mongoose, { Schema, Document } from "mongoose";

export interface IUniversityModel {
  name: string;
  abbr: string;
  totalDepartments: number;
}

interface IUniversityDocument extends IUniversityModel, Document {}

const UniversitySchema = new Schema<IUniversityDocument>({
  name: {
    type: String,
    required: true,
  },
  abbr: {
    type: String,
    lowercase: true,
    required: true,
  },
  totalDepartments: {
    type: Number,
    required: true,
  },
});

const University = mongoose.model<IUniversityDocument>(
  "universitys",
  UniversitySchema
);

export default University;
