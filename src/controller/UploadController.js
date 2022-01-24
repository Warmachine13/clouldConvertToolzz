const fs = require("fs");
const {
  ConvertPPTXToPdfInterface,
} = require("../interface/ConvertPPTXToPdfInterface");

class UploadController {
  constructor() {}
  async handle(req, res) {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    try {
      const cloudConvert = new ConvertPPTXToPdfInterface(req.files.file.data);

      const result = await cloudConvert.convert();
      let file = `${Date.now()}.pdf`;
      let filename = `./files/${file}`;

      fs.writeFileSync(filename, result);

      const { protocol, hostname } = req;

      const fullURL = protocol + "://" + `${hostname}:${process.env.PORT}`;

      return res
        .json({
          url: `${fullURL}/${file}`,
        })
        .status(200);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

module.exports = { UploadController };
