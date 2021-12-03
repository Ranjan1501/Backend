const multer = require('multer');
const path = require('path'); // built in with node 

const storage = multer.diskStorage({   // copy from diskStorage npm multer package
  destination: function (req, file, callback) {   // file destination
    callback(null, path.join(__dirname, "../uploads"))   //null--> error  it means i am giving path(node module ) where i upload my data or images 
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, uniquePrefix + '-' + file.originalname); // originalname in lower case 
    // adding date.now before file name so that two filename are never the same 
  }
})

// file Filter function
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    callback(null, true);

  } else {
    callback(null, false);
  }

};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 10248 * 10 // 10MB

  },
});
