import multer from "multer";

const storage = multer.diskStorage({
  // Specify the destination directory where the ifle needs to be saved
  destination: (req, file, cb) => {
    cb(null, "~/www/photoshare/");
  },
  // Specify name of the file. Date is prefixed to avoid collisions
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + Date.now());
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    )
      cb(null, true);
    else {
      cb(null, false);
      return cb(new Error("INVALID_TYPE"));
    }
  },
});
