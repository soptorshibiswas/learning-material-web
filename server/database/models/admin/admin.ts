import mongoose, { Schema, Document, FilterQuery, UpdateQuery } from "mongoose";

export interface IAdminModel {
  username: string;
  password: string;
  avatar: string;
  verified: boolean;
}

export interface IAdminDocument extends IAdminModel, Document {}

const AdminSchema = new Schema<IAdminDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

const Admin = mongoose.model<IAdminDocument>("admins", AdminSchema);

export default Admin;

export const updateAdminSingle = async (
  query: FilterQuery<IAdminDocument>,
  data: UpdateQuery<IAdminDocument>
) => {
  const options = { new: true, omitUndefined: true };
  const updatedData = await Admin.findOneAndUpdate(query, data, options);
  return updatedData;
};
