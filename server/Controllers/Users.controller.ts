import mongoose from "mongoose";
import USER from "../Models/User.schema";
import { ResponseDTO } from "../Routes/users";

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
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
  __v: number;
}

export async function RegisterUserService(
  data: CreateUserDTO
): Promise<ResponseDTO> {
  try {
    const register_instance = new USER(data);
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
// export async function LoginService(
//   credentials: Partial<CreateUserDTO>
// ): Promise<LoginResponseDTO> {
//   try {
//     const login_instance: UserMongooseResponse | any = await USER.findOne({
//       email: credentials.email,
//     }).exec();

//     if (login_instance == null) {
//       throw new Error("User does not exist");
//     }

//     if (
//       login_instance?.email === credentials.email &&
//       login_instance?.password === credentials.password
//     ) {
//       return {
//         message: [`Login SuccessFul`],
//         success: true,
//         id: login_instance._id.toString(),
//       };
//     } else {
//       console.log(login_instance);

//       return {
//         message: [`Credentials are incorrect.`],
//         success: false,
//       };
//     }
//   } catch (error) {
//     console.log(error);
//     return {
//       message: [`This User does not exist.`],
//       success: false,
//     };
//   }
// }

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
