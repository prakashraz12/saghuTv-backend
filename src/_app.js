import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//app init
const app = express();

app.use(
  cors()
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRoute from "./routes/user.routes.js";
import newsRoute from "./routes/news-post.routes.js"
import publicRoute from "./routes/public.routes.js"

//route declarations
app.use("/api/v1/user", userRoute);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/public", publicRoute);

export { app };
