import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import mailRoute from "./routes/enquiryRoute.js";
import adminRoute from "./routes/adminRoute.js";
import bannerRoute from "./routes/bannerRoute.js";
import projectRoute from "./routes/projectRoute.js";
import HomeRoute from "./routes/homeRoute.js";
import CarrerRoute from "./routes/careerRoute.js";
import faqRoute from "./routes/faqRoute.js";
import viewRoute from "./routes/viewRoute.js";
import PrivacyPoilcyRoute from "./routes/PolicyRoute.js";
import genralSettingRoute from "./routes/genralSettingsRoute.js";
import videoRoute from "./routes/videoRoute.js";
import jobRoutes from "./routes/jobRoute.js";
import mediaRoute from "./routes/mediaRoute.js";
import excelRoute from "./routes/excelEnquiryRote.js";
import donateRoute from "./routes/DonateRoute.js"
import cowRoute from "./routes/cowRoute.js"
import bankRoute from "./routes/bankRoute.js"
import blogRoute from "./routes/blogRoute.js"
import { responseMiddleware } from "./middleware/response.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

const app = express();

// 

// 🔹 Middleware
app.use(
  cors({
    origin: [
      process.env.LOCAL_FRONTEND,
      process.env.WEBSITE_FRONTEND_URL,
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use(responseMiddleware);

// 🔹 Routes
app.use("/api/mail", mailRoute);
app.use("/api/admin", adminRoute);
app.use("/api/banners", bannerRoute);
app.use("/api/projects", projectRoute);
app.use("/api/home", HomeRoute);
app.use("/api/career", CarrerRoute);
app.use("/api/faq", faqRoute);
app.use("/api", PrivacyPoilcyRoute);
app.use("/api/view", viewRoute);
app.use("/api/genral-setting", genralSettingRoute);
app.use("/api/job-enquiry", jobRoutes);
app.use("/api/media", mediaRoute);
app.use("/api/excel-enquiry", excelRoute);
app.use("/api/donate", donateRoute)
app.use("/api/cow-image", cowRoute)
app.use("/api/bank", bankRoute)
app.use("/api/blog", blogRoute)

// ===============================
// 🚀 NORMAL EXPRESS SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});
