import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin, { updateAdminSingle } from "../database/models/admin/admin";
import {
  IAdminAuthToken,
  IAdminCreateData,
  IAdminLoginData,
} from "../../shared/types/admin";
import config from "../../settings/config";
import { COOKIE_KEYS } from "../../shared/types/cookies";

// Create a central admin
export const createCentralAdmin = async (req: Request, res: Response) => {
  const data: IAdminCreateData = req.body;

  const oldAdmin = await Admin.findOne({ username: data.username });
  if (oldAdmin)
    return res
      .status(400)
      .json({ message: "Admin with same username already exists" });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(data.password, salt);

  const newAdmin = new Admin({
    username: data.username,
    password: passwordHash,
    avatar: "https://ui-avatars.com/api/?name=" + data.username + "&size=128",
    verified: false,
  });

  const admin = await newAdmin.save();
  return res.status(201).json(admin);
};

// Verify a central admin
export const verifyCentralAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;

  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const verifiedAdmin = await updateAdminSingle(
    { _id: adminId },
    { verified: true }
  );
  return res.status(200).json(verifiedAdmin);
};

// Admin login
export const loginAdmin = async (req: Request, res: Response) => {
  const data: IAdminLoginData = req.body;
  const admin = await Admin.findOne({ username: data.username });
  if (!admin)
    return res.status(404).json({ message: "No matched Username found" });

  const isMatch = await bcrypt.compare(data.password, admin.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

  if (!admin.verified)
    return res.status(403).json({ message: "Admin is not verified yet" });

  const tokenAdmin: IAdminAuthToken = {
    adminId: admin._id,
  };

  const authAdmin = {
    username: admin.username,
    avatar: admin.avatar,
  };

  const JWToken = jwt.sign(tokenAdmin, config.adminSecret, {
    expiresIn: config.EXPIRATION_TIME_ADMIN,
  });
  const authToken = "JWT " + JWToken;

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .cookie(COOKIE_KEYS.authAccessToken, authToken, cookieOptions)
    .cookie(COOKIE_KEYS.authAdmin, authAdmin, cookieOptions)
    .status(200)
    .json(authAdmin);
};

export const logoutAdmin = (_req: Request, res: Response) => {
  res
    .clearCookie(COOKIE_KEYS.authAccessToken)
    .clearCookie(COOKIE_KEYS.authAdmin)
    .status(200)
    .end();
};

export const changeAdminPassword = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const { password } = req.body;

  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const updatedAdmin = await Admin.findOneAndUpdate(
    { _id: adminId },
    { password: passwordHash },
    { new: true }
  );
  if (!updatedAdmin)
    return res.status(400).json({ message: "Failed to change password" });

  return res.status(200).json(updatedAdmin);
};
