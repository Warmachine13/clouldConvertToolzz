const express = require("express");
const fileUpload = require("express-fileupload");
const { router } = require("./src/routes");

require("dotenv").config();

const app = express();
app.use("/files", express.static("files"));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(router);

app.listen(process.env.PORT || 3000);
