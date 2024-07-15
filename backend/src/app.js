const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const truthRoutes = require("./routes/truth.routes");
const yaml = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerRoute = require("./constant");
const swaggerDocument = yaml.load("api.yaml");

app.use(swaggerRoute, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/truth", truthRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
