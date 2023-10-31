const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./src/Router/UserRouter.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description: "Some description...",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      someBody: {
        $email: "Felipe Doe",
        $senha: 291,
        about: "",
      },
      someResponse: {
        email: "Felipe Doe",
        senha: 29,
        diplomas: [
          {
            school: "XYZ University",
            year: 2020,
            completed: true,
            internship: {
              hours: 290,
              location: "XYZ Company",
            },
          },
        ],
      },
      someEnum: {
        "@enum": ["red", "yellow", "green"],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./src/index"); // arquivo raiz do seu projeto
});
