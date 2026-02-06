import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect(process.env.DB_URI!).then((conn) => {
    console.log(`Database Connected ${conn.connection.host}`);
  });
};
