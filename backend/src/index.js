require("dotenv").config();

const express = require("express");
const YAML = require("yamljs");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const router = require("./routes");

const app = express();

const swaggerDocument = YAML.load("./spec.yaml");
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Server running on port ${port}`));
