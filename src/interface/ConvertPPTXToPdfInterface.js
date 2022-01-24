var clouldConvert = require("office-to-pdf");

class ConvertPPTXToPdfInterface {
  constructor(stream) {
    this.pptxConvert = clouldConvert;
    this.stream = stream;
  }

  async convert() {
    return this.pptxConvert(this.stream);
  }
}

module.exports = { ConvertPPTXToPdfInterface };
