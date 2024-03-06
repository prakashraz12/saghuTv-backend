import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//app init
const app = express();

app.use(cors());

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRoute from "./routes/user.routes.js";
import newsRoute from "./routes/news-post.routes.js";
import publicRoute from "./routes/public.routes.js";
import categoryRoute from "./routes/category.routes.js";
import menuRoute from "./routes/menu.routes.js";
//route declarations
app.use("/api/v1/user", userRoute);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/public", publicRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/menu", menuRoute);

export { app };
