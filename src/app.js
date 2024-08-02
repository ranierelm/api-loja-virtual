import express from "express";
import dotenv from "dotenv";
import sequelize from "./database/index.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3300;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
