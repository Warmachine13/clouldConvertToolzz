const { Router } = require("express");
const { UploadController } = require("../controller/UploadController");

const router = Router();

const uploadController = new UploadController();

router.post("/upload", uploadController.handle);

module.exports = { router };
