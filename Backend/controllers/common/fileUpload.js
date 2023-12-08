const cloudinary = require('cloudinary').v2;

const fileUpload = async (req, res) => {
  try {
    let files = req.files.files; // Assuming the field name for files is "files"
    let isSingleFile = !Array.isArray(files);
    
    if (!files) {
      return res.status(403).json({ success: false, message: 'Missing files' });
    }

    const options = {
      folder: "FileUploadApp",
      resource_type: "auto"
    };

    const uploadedFiles = [];

    if (isSingleFile) {
      // Wrap the single file in an array
      files = [files];
    }

    for (const file of files) {
      const response = await cloudinary.uploader.upload(file.tempFilePath, options);
      uploadedFiles.push({ fileURL: response.secure_url });
    }

    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      uploadedFiles
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in file upload',
      error: err.message
    });
  }
};

module.exports = fileUpload;
