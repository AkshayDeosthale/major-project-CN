import { Request, Response } from "express";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import USER from "../Models/User.schema";
import { ResponseDTO } from "../Routes/users";
import * as nodemailer from "nodemailer";
import * as speakeasy from "speakeasy";

import dotenv from "dotenv";
dotenv.config();

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  MFACode: string;
}

export interface UserMongooseResponse extends mongoose.Document {
  _id: object;
  username: string;
  email: string;
  password: string;
  interests: string[];
  followers: string[];
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  MFACode: string;
  __v: number;
}

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function getFullURL(relativePath: string) {
  const baseURL = `http://localhost:3000${relativePath}`; // This can be dynamic or set through environment variables
  return baseURL;
}

export async function RegisterUserService(
  data: CreateUserDTO
): Promise<ResponseDTO> {
  try {
    const MFACode = speakeasy.generateSecret({ length: 4 });
    const register_instance = new USER({ ...data, MFACode: MFACode.ascii });
    await register_instance.save(); // Await the save operation

    return {
      message: [
        `User with name ${data.username} and email ${data.email} created`,
      ],
      success: true,
    };
  } catch (error: any) {
    console.log(error.Error, error.code);

    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation error (e.g., required fields missing)
      return {
        message: [`Validation error: ${error.message}`],
        success: false,
      };
    } else if (error.code === 11000) {
      // Handle MongoDB duplicate key error
      return {
        message: [`Duplicate key error: Username or Email Already exists`],
        success: false,
      };
    } else {
      // Handle other types of errors (e.g., database connection issues)

      return {
        message: [`Error occurred , check server for logs`],
        success: false,
      };
    }
  }
}

//manual login
export async function LoginService(credentials: Partial<CreateUserDTO>) {
  try {
    const login_instance: UserMongooseResponse | any = await USER.findOne({
      email: credentials.email,
    }).exec();

    if (login_instance == null) {
      throw new Error("User does not exist");
    }

    if (
      login_instance?.email === credentials.email &&
      login_instance?.password === credentials.password
    ) {
      if (login_instance.MFACode !== credentials.MFACode) {
        return {
          message: [`Incorrect Code`],
          success: false,
        };
      }
      console.log(login_instance.MFACode, credentials.MFACode);
      return {
        message: [`Login SuccessFul`],
        success: true,
        id: login_instance._id.toString(),
      };
    } else {
      return {
        message: [`Credentials are incorrect.`],
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: [`This User does not exist.`],
      success: false,
    };
  }
}

export async function GetAllUsers() {
  try {
    const user = await USER.find({});
    return user;
  } catch (error) {
    return {
      message: [`Error occurred , check server for logs`],
      success: false,
    };
  }
}

export async function UpdateProfile(req: Request, res: Response, id: string) {
  try {
    let user: any = await USER.findById(id);

    USER.uploadAvatar(req, res, function (error: any) {
      if (error) {
        console.log(error);

        return {
          message: [`Error occurred , check server for logs`],
          success: false,
        };
      }
      if (req.file) {
        // if (user.avatar) {
        //   const existsSync = fs.existsSync(user.avatar);
        //   if (existsSync) {
        //     fs.unlinkSync(user.avatar);
        //   }
        // }

        const imgpath = path.join(USER.avatarPath, req.file.filename);
        user.avatar = getFullURL(imgpath);
      }

      user.save();
    });
    console.log(user.avatar);

    return {
      message: [`Image saved Successfully `],
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      message: [`Error occurred , check server for logs`],
      success: false,
    };
  }
}

export async function getUserDetails(id: string) {
  try {
    let user: any = await USER.findById(id);
    return {
      message: [`Image saved Successfully `],
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      message: [`Error occurred , check server for logs`],
      success: false,
    };
  }
}

export async function getMFACode(req: Request, res: Response) {
  // Generate a token
  const secret = speakeasy.generateSecret().base32;
  const token = speakeasy.totp({
    secret: secret,
    encoding: "base32",
    step: 300,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.body.email,
    subject: "Your MFA Token",
    text: `Your MFA token is: ${token}. It will expire in 5 minutes.`,
  };

  try {
    const user = await USER.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { MFACode: token } }
    );
    const res = await transporter.sendMail(mailOptions);
    console.log(res);

    console.log(`MFA token sent to ${req.body.email}`);
    return {
      message: [`Email Sent `],
      success: true,
    };
  } catch (error) {
    console.error(`Error sending MFA token: ${error}`);
    return {
      message: [`Email Not Sent `],
      success: false,
    };
  }
}

export async function verifyMFA(req: Request, res: Response) {
  console.log(req.body.id);
  try {
    const user: any = await USER.findById(req.body.id);
    console.log(user);

    if (req.body.MFACode === user?.MFACode) {
      return {
        message: [`OTV Verified`],
        success: true,
        userDetail: user,
      };
    } else {
      throw new Error("");
    }
  } catch (error) {
    return {
      message: [`Enter correct OTP`],
      success: true,
    };
  }
}
