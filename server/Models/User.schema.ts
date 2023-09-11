import mongoose, { Model } from "mongoose";
import multer from "multer";
import path from "path";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  interests?: string[];
  followers?: string[];
  avatar?: string;
}
export interface UserModel extends Model<UserInterface> {
  uploadAvatar: any;
  avatarPath: string;
}

const AvatarPath = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },

    password: { type: String, required: [true, "Password is required"] },
    interests: [String],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
    avatar: { type: String },
  },
  { timestamps: true }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AvatarPath));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

userSchema.statics.uploadAvatar = multer({ storage: storage }).single("avatar");
userSchema.statics.avatarPath = AvatarPath as any;

const USER = mongoose.model<UserInterface, UserModel>("USER", userSchema);

export default USER;
