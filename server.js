const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const fs = require("fs");
require("dotenv").config();

const {
  ConvertPPTXToPdfInterface,
} = require("./src/interface/ConvertPPTXToPdfInterface");

const app = express();
app.use(express.static("files"));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.post("/upload", async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.file;

  try {
    const cloudConvert = new ConvertPPTXToPdfInterface(req.files.file.data);

    const result = await cloudConvert.convert();
    let file = `${Math.random()}.pdf`;
    let filename = `./files/${file}`;

    fs.writeFileSync(filename, result);

    const protocol = req.protocol;
    const hostname = req.hostname;

    const fullURL = protocol + "://" + `${hostname}:${process.env.PORT}`;

    return res
      .json({
        url: `${fullURL}/${file}`,
      })
      .status(200);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(process.env.PORT || 3000);
