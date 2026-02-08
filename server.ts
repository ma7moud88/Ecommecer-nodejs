import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { globalError } from "./MiddleWares/errorMilddleware.ts";
import ApiError from "./utils/apierror.ts";
import { connectDB } from "./config/database.ts";
import categoryRoute from "./routes/categoryRoute.ts";
import subCategoryRoute from "./routes/subCategoryRoute.ts";
import brandRoute from "./routes/brandRoute.ts";
import productRoute from "./routes/productRoute.ts";

dotenv.config({ path: "config.env" });
connectDB();

// express app
const app = express();
// maddleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//Routes
app.get("/", (req, res) => {
  res.send("welcome");
});
// mount routes
app.use("/api/category", categoryRoute);
app.use("/api/subcategories", subCategoryRoute);
app.use("/api/brands", brandRoute);
app.use("/api/products", productRoute);

app.all("", (req: any, res: any, next: any) => {
  // create error and send it to error handling middleware
  // const err = new Error();
  // next(err.message);
  next(new ApiError(`Can't find this route:${req.originalUrl}`, 400));
});

//Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}...`);
});

//Handle rejection outside express
process.on("unhandledRejection", (err: any) => {
  console.error(`unhandleRejection Error:${err.name} |${err.message}`);
  server.close(() => {
    console.error("shutting down....");
    process.exit(1);
  });
});
