
// #!/usr/bin / env node

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./_app.js";
dotenv.config({
  path: "../.env",
});

//connect database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

//
