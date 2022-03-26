
const S3 = require(`aws-sdk/clients/s3`);

const localMinioService = require("./local-minio.js");

const s3 = new S3({region: `us-west-2`});

async function downloadExternalFile(options) {
    return s3.makeUnauthenticatedRequest(
        `getObject`,
        options,
        async (err, response) => {
          if (err) {
            console.log(`Error`, err);
            throw new Error(err);
          } else {
            console.log(`Success`, response.Body);
            return localMinioService.copyFile(response.Body)
          }
        }
      );
}

module.exports = {
  downloadExternalFile,
}


  