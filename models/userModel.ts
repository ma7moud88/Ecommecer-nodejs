import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name required"],
      trim: true,
    },
    sluug: {
      type: String,
      lowercase: true,
    },
    email: {
      require: [true, "email required"],
      type: String,
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      require: [true, "password requires"],
      minlength: [6, "too short password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", UserSchema);
