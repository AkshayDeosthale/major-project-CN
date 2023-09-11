import POST from "../Models/Posts.schema";
import { ResponseDTO } from "../Routes/users";

export interface CreatePostDTO {
  to: string;
  from: string;
  title: string;
  interestType: string;
  description: string;
  likes: number;
  comments: {
    user: string;
    comment: string;
  };
}

export async function CreatePost(data: CreatePostDTO): Promise<ResponseDTO> {
  try {
    const post_instance = new POST(data);
    await post_instance.save();
    return {
      message: [`Post created`],
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: [`Error occurred , check server for logs`],
      success: false,
    };
  }
}

export async function GetAllPosts(): Promise<any> {
  try {
    const posts = await POST.find({})
      .populate("to")
      .populate("from")
      .populate({ path: "comments", populate: { path: "user" } })
      .exec();

    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    console.error(error);
    return {
      message: [`Error occurred , check server for logs`],
      success: false,
    };
  }
}
