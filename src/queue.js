import dotenv from "dotenv";
dotenv.config();

import Queue from "./lib/Queue.js";

import sequelize from "./database/index.js";

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected - Queue server");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

Queue.process();
