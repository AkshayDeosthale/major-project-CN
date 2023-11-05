/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import * as React from "react";
import { useCookies } from "react-cookie";
import { Post } from ".";
import AxiosInstance from "../../../Configs/AxiosInstance";
import { User } from "../../../Redux/Slices/user.slice";
import { WritePostInput } from "./MainHomepageContent.styles";

export interface Comments {
  content: string;
  user: User;
  post: Post;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Props {
  comments: Comments[];
  postId: string;
}

export default function Comments({ comments, postId }: Props) {
  const [postComents, setpostComents] =
    React.useState<Partial<Comments[]>>(comments);
  const [userComment, setuserComment] = React.useState<string>("");
  const [cookies] = useCookies(["userID", "quoraSession"]);

  const submitComment = async () => {
    try {
      const data = {
        user: cookies.userID,
        content: userComment,
        post: postId,
      };

      const res = await AxiosInstance.post(`/comments/create/${postId}`, data, {
        withCredentials: true,
      });

      setpostComents([...postComents, res.data.data]);
      setuserComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "15px",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Avatar sx={{ width: 28, height: 28 }} alt="hi" src="/1.jpg" />
          <WritePostInput
            color="warning"
            placeholder="Add comment"
            value={userComment}
            onChange={(e) => setuserComment(e.target.value)}
          />
          <IconButton
            sx={{ position: "absolute", right: 6 }}
            onClick={submitComment}
            edge="end"
            size="small"
            color="secondary"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </ListItem>

      {postComents.reverse().map((comment, key) => (
        <React.Fragment key={key}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={comment?.content}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment?.user.username}
                  </Typography>
                  {`- ${dayjs(comment?.createdAt).format(
                    "DD MMMM YYYY HH:mm"
                  )}`}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
