require("dotenv").config();
const swaggerDefinition = {
  info: {
    title: "node-api-start-project",
    version: "0.0.1",
    description: "For start node api for backend",
  },
  host: process.env.HostName,
  basePath: "/",
  securityDefinitions: {
    UserSecurity: {
      type: "apiKey",
      name: "User-Key",
      scheme: "bearer",
      in: "header",
    },
  },
  schemes: ["http"],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

module.exports = options;
