const S3 = require(`aws-sdk/clients/s3`);
require(`dotenv`).config();

const accessKeyId = process.env.ACCESS_KEY_ID || `minioadmin`;
const secretAccessKey = process.env.SECRET_ACCESS_KEY ||  `minioadmin`;
const region = process.env.REGION || `EUROPE-WEST1`;
const endpoint = process.env.ENDPOINT || `http://127.0.0.1:9000`;

const s3 = new S3({
    accessKeyId,
    secretAccessKey,
    region,
    endpoint,
    s3ForcePathStyle: true
 });


async function copyFile(file){
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const Key = `${year}/${month}/events.csv`;
    const options = {
        Bucket: `mybucket`,
        Key,
        Body: file
    }
    try{
        return s3.upload(options).promise();
    } catch(error){
        console.log("copyFile error", error)
    }
}

async function getBucketData(options) {
    try{
        return s3.listObjectsV2(options).promise();

    } catch(e){
        console.log("getBucketData error", error)
    }
}

module.exports = {
    copyFile,
    getBucketData,
}