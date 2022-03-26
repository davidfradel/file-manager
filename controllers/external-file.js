const awsS3Service = require("./../services/aws-s3.js");

async function copyExternalFileSources(req, res) {
  const { bucket } = req.params;
  const { path } = req.query;
  try {
    if (!path) {
      throw new Error(`path query is missing`);
    }

    const options = {
      Bucket: bucket,
      Key: path,
    };

    await awsS3Service.downloadExternalFile(options);
    return res.send('Upload in progress');
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  copyExternalFileSources,
};
