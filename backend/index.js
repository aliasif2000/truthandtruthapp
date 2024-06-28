require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const truthRoutes = require("./routes/truthRoutes");
const yaml = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = yaml.load("api.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/truth", truthRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
