const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_CLOUND_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET,
});

module.exports = {
  push: async function (chunkFile) {
    let url, public_id;
    try {
      await cloudinary.uploader.upload(chunkFile, function (err, result) {
        if (err) {
          throw new Error("upload failed");
        } else {
          url = result.url;
          public_id = result.public_id;
        }
      });
    } catch (error) {
      throw error;
    }
    return { url, public_id };
  },
  destroy: async function (public_id) {
    try {
      if (public_id.length === 0) return;
      await cloudinary.uploader.destroy(public_id);
    } catch (error) {
      throw error;
    }
  },
};
