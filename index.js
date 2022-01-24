const {
  ConvertPPTXToPdfInterface,
} = require("./src/interface/ConvertPPTXToPdfInterface");
const { AWSInterface } = require("./src/interface/AWSInterface.js");

const { Lambda } = require("aws-sdk");

const lambda = new Lambda({
  apiVersion: "2015-03-31",
  // endpoint needs to be set only if it deviates from the default, e.g. in a dev environment
  // process.env.SOME_VARIABLE could be set in e.g. serverless.yml for provider.environment or function.environment
  endpoint: true
    ? "http://localhost:3002"
    : "https://lambda.us-east-1.amazonaws.com",
});

exports.handler = async ({ Records: records }, context, callback) => {
  console.log("entrou");
  try {
    const responses = await Promise.all(
      records.map(async (record) => {
        const cloudConvert = new ConvertPPTXToPdfInterface(record);
        try {
          const response = await cloudConvert.convert();
          // const awsInterface = new AWSInterface();
          // const object = await awsInterface.putObject(
          //   response,
          //   "convert-pdf-img",
          //   `${record.name}.pdf`
          // );
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              message: "Convertion done",
              url: response,
            }),
          });
        } catch (error) {}
      })
    );
    return {
      statusCode: 301,
      body: JSON.stringify({ responses }),
    };
  } catch (error) {
    return error;
  }
};

// export { handler };
