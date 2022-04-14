import AWS from "aws-sdk";
import path from "path";
import sharp from "sharp";
import config from "../../settings/config";

function resizeWithSharp(
  inputFile: Buffer,
  width: number,
  height: number | undefined,
  fit: "cover" | "inside"
) {
  return sharp(inputFile)
    .resize({
      width,
      withoutEnlargement: true,
      height,
      fit: fit === "cover" ? sharp.fit.cover : sharp.fit.inside,
    })
    .withMetadata()
    .toFormat("jpeg")
    .toBuffer();
}

const getResizedImages = async (inputFile: Buffer, width: number) => {
  const resizedFull = await resizeWithSharp(
    inputFile,
    width,
    undefined,
    "inside"
  );
  return resizedFull;
};

export const getRandomFileName = (imageTitle: string) => {
  const randKey = Math.floor(1000 + Math.random() * 9000);
  const imageTitleProcessed = imageTitle.replace(/[^a-zA-Z0-9]/g, "_");

  return `${imageTitleProcessed}_${randKey}`;
};

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_ACCESS_KEY_SECRET,
});

export async function resizeAndUploadToStorage(
  folderName: string,
  id: string,
  width: number,
  fileBuffer: Buffer
) {
  // console.log(id);
  const resizedFull = await getResizedImages(fileBuffer, width);

  const randomFileName = getRandomFileName(id);

  const imageKey = `${folderName}/${randomFileName}.jpeg`;

  const fullUploadData = await s3
    .upload({
      Bucket: config.S3_ENGAZE_BUCKET,
      Key: imageKey,
      Body: resizedFull,
      ACL: "public-read",
      ContentType: "image/jpeg",
    })
    .promise();

  const imagePath = fullUploadData.Location;

  return imagePath;
}

export function checkImageFileType(file: Express.Multer.File) {
  const fileTypes = /^.(jpg|jpeg|png)$/i;
  const validExtension = fileTypes.test(path.extname(file.originalname));
  if (!validExtension) return false;

  const mimeTypes = /^(image\/)/;
  const validateMimeType = mimeTypes.test(file.mimetype);
  if (!validateMimeType) return false;

  const headerTypes = /^(89504E470D0A1A0A|FFD8FF)/i;
  const validateHeader = headerTypes.test(
    file.buffer.slice(0, 12).toString("hex")
  );
  if (!validateHeader) return false;

  return true;
}
