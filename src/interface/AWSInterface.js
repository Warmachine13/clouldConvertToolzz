const AWSSDK = require("aws-sdk");

class AWSInterface {
  constructor() {
    this.s3 = new AWSSDK.S3();
    this.bucket = process.env.bucket;
  }

  async upload(file, key) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    };
    return this.s3.upload(params).promise();
  }

  async putObject(key, body) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ContentType: "application/pdf",
    };
    return this.s3.putObject(params).promise();
  }

  async delete(key) {
    const params = {
      Bucket: this.bucket,
      Key: key,
    };
    return this.s3.deleteObject(params).promise();
  }
}

module.exports = { AWSInterface };
