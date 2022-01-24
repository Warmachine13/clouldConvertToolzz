const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const fs = require("fs");

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
  const path = __dirname + "/files/" + file.name;
  //   console.log(req.files.file.data);
  const cloudConvert = new ConvertPPTXToPdfInterface(req.files.file.data);

  const result = await cloudConvert.convert();

  fs.writeFileSync(`./${Math.random()}.pdf`, result);

  // const pathFile = `${__dirname}/files/${Math.random() * 100}.png}`;

  // fs.writeFile(`${pathFile}`, result, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("foi");
  // });

  res.send(result).status(200);

  return res.status(500).send(pathFile);
  //   file.mv(path, (err) => {
  //     if (err) {
  //     }
  //     return res.send({ status: "success", path: cloudConvert });
  //   });
});

app.listen(3000);
