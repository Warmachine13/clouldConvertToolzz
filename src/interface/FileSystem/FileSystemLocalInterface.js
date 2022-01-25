const fs = require("fs");
const path = require("path");
// const FileSystemInterface = require("./FileSystemInterface");

class FileSystemLocalInterface {
  constructor() {}
  async writeFile(data) {
    return await new Promise((resolve, reject) => {
      let file = `${Date.now()}.pdf`;
      let filename = path.join(`./files/${file}`);

      fs.writeFile(filename, data, function (err) {
        if (err) reject(err);
        resolve(filename);
      });
    });
  }
}

module.exports = { FileSystemLocalInterface };
