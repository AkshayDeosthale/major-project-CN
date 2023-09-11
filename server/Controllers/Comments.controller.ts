import COMMENT from "../Models/Comments.schema";
import POST from "../Models/Posts.schema";
import { ResponseDTO } from "../Routes/users";

export interface CreateCommentDTO {
  user: string;
  content: string;
  post: string;
}

export async function CreateComment(
  data: CreateCommentDTO,
  postId: string
): Promise<ResponseDTO> {
  try {
    //1. Create comment
    const comment_instance = await new COMMENT(data);
    await comment_instance.save();

    //2. Add this comment ID to the post
    await POST.findByIdAndUpdate(postId, {
      $push: { comments: comment_instance._id },
    });

    //3. Send added comment back
    const commentDetail = await COMMENT.findById(comment_instance._id)
      .populate("user")
      .populate("post")
      .exec();
    return {
      message: [`Comment created`],
      success: true,
      data: commentDetail,
    };
  } catch (error) {
    console.error(error);
    return {
      message: [`Error occurred , check server for logs`],
      success: false,
    };
  }
}

export async function GetAllComments(): Promise<any> {
  try {
    const posts = await POST.find({}).populate("to").populate("from").exec();
    console.log(posts);

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
