const multer = require('multer');
const fs = require('fs');

const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/profile/';
    ensureDirExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const profileUpload = multer({
  storage: profileStorage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Only .jpeg, .png, .jpg formats are allowed'));
  }
});


module.exports = {
  profileUpload,
};