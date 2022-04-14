const DEPLOY = process.env.DEPLOY || "development";
const dbUrl = process.env.DB_URL || "";
const adminSecret = process.env.ADMINSECRET || "learning_jwt_material";
const EXPIRATION_TIME_ADMIN = process.env.EXPIRATION_TIME_ADMIN || "1d";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
const AWS_ACCESS_KEY_SECRET = process.env.AWS_ACCESS_KEY_SECRET || "";
const S3_ENGAZE_BUCKET = process.env.S3_ENGAZE_BUCKET || "";

export default {
  DEPLOY,
  dbUrl,
  adminSecret,
  EXPIRATION_TIME_ADMIN,
  AWS_ACCESS_KEY_ID,
  AWS_ACCESS_KEY_SECRET,
  S3_ENGAZE_BUCKET,
};
