import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import ApiError from "./utils/apierror.ts";
import { connectDB } from "./config/database.ts";
import categoryRoute from "./routes/categoryRoute.ts";
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

app.use("/api/category", categoryRoute);

app.all("", (req: any, res: any, next: any) => {
  // create error and send it to error handling middleware
  // const err = new Error();
  // next(err.message);
  next(new ApiError(`Can't find this route:${req.originalUrl}`, statusCode));
});
// error handling
app.use((err: any, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack, // مكان ===>error فين؟؟؟
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}...`);
});
