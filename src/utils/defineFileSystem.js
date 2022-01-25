const {
  FileSystemLocalInterface,
} = require("../interface/FileSystem/FileSystemLocalInterface");
const {
  FileSystemAWSInterface,
} = require("../interface/FileSystem/FileSystemAWSInterface");

function defineFileSystem(fileSystem) {
  if (fileSystem === "s3") {
    const fileSystemAws = new FileSystemAWSInterface();
    return fileSystemAws;
  }
  const fileSystemLocal = new FileSystemLocalInterface();
  return fileSystemLocal;
}

module.exports = { defineFileSystem };
