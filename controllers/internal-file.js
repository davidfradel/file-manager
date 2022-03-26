const minioService = require("./../services/local-minio");

async function getBucketData(req, res) {
  const { bucket } = req.params;
  try {
    const options = {
      Bucket: bucket,
    };

    const response = await minioService.getBucketData(options);
    res.json(response);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
    getBucketData,
};
