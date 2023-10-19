const swaggerAutogen = require("swagger-autogen")();

//const end = require("./Router/UserRouter");

const outputFile = "./src/swagger.json";
const endpointsFiles = ["./src/Router/UserRouter.js"];

swaggerAutogen(outputFile, endpointsFiles)
