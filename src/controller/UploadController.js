const {
  ConvertPPTXToPdfInterface,
} = require("../interface/ConvertPPTXToPdfInterface");

const { defineFileSystem } = require("../utils/defineFileSystem");

class UploadController {
  async handle(req, res) {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    try {
      const cloudConvert = new ConvertPPTXToPdfInterface(req.files.file.data);

      const result = await cloudConvert.convert();

      const fileSystem = defineFileSystem(process.env.FILESYSTEM_DRIVER);
      const file = await fileSystem.writeFile(result);
      const { protocol } = req;

      if (`${file}`.includes("s3")) {
        return res.status(200).send({ url: file });
      }

      const fullURL = protocol + "://" + `${req.get("host")}`;

      return res
        .json({
          url: `${fullURL}/${file.replace("./", "")}`,
        })
        .status(200);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
}

module.exports = { UploadController };
