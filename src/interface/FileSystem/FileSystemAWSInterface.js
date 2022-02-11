const S3 = require("aws-sdk/clients/s3");

class FileSystemAWSInterface {
  constructor() {
    const region = process.env.AWS_BUCKET_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;
    this.s3 = new S3({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }

  async writeFile(data) {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const uploadParams = {
      Bucket: bucketName,
      Body: data,
      Key: `convery/${Date.now()}.pdf`,
      ACL: "public-read",
      ContentDisposition: "inline",
      ContentType: "application/pdf",
    };

    return await (
      await this.s3.upload(uploadParams).promise()
    ).Location;
  }
}

module.exports = { FileSystemAWSInterface };
