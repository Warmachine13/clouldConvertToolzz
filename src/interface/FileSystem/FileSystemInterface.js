const fs = require("fs");

const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

class FileSystemInterface {
  constructor() {}
  async deleteFile(file) {
    return await unlinkFile(file);
  }
}

module.exports = { FileSystemInterface };
