import multer from "multer";
import path from "path";
import { ensureDir, safeFileName, imageOnlyFilter } from "./_uploadUtils.js";

const ROOT = path.join(process.cwd(), "uploads");
const IMAGES_DIR = path.join(ROOT, "products", "images");
const THUMB_DIR = path.join(ROOT, "products", "thumbnails");

ensureDir(IMAGES_DIR);
ensureDir(THUMB_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, file.fieldname === "thumbnail" ? THUMB_DIR : IMAGES_DIR),
  filename: (req, file, cb) => cb(null, safeFileName(file.originalname)),
});

export default multer({
  storage,
  fileFilter: imageOnlyFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 7 },
});