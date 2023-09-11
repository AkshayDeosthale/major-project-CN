/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { WritePostInput } from "./MainHomepageContent.styles";
import { Post, User } from ".";
import dayjs from "dayjs";
import AxiosInstance from "../../../Configs/AxiosInstance";
import { useCookies } from "react-cookie";
import SendIcon from "@mui/icons-material/Send";

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
  const [cookies] = useCookies(["userID", "userDetail", "quoraSession"]);

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

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {" — Do you have Paris recommendations? Have you ever…"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
