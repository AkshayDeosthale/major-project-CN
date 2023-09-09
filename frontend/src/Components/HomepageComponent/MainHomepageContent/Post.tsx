/* eslint-disable @typescript-eslint/no-unused-vars */
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MoodIcon from "@mui/icons-material/Mood";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Post as PostProp } from ".";
import Comments from "./Comments";
import {
  PostNameAndFollowContainer,
  WriteAskButton,
} from "./MainHomepageContent.styles";

interface Props {
  post: PostProp;
  fetchTimelinePosts: () => Promise<void>;
}

export default function Post({ post, fetchTimelinePosts }: Props) {
  const [commentsOpen, setcommentsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "userDetail",
    "quoraSession",
  ]);

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            src="/3.jpg"
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          ></Avatar>
        }
        title={
          <PostNameAndFollowContainer>
            <Typography sx={{ fontFamily: "cursive" }}>
              {post.from.username}
            </Typography>
            {post.from._id === cookies.userID ? (
              <DoneAllIcon sx={{ color: "green", fontSize: "15px" }} />
            ) : (
              <WriteAskButton
                sx={{
                  width: "70px",
                  backgroundColor: "purple",
                  color: "white",
                }}
              >
                Follow
              </WriteAskButton>
            )}
          </PostNameAndFollowContainer>
        }
        subheader={dayjs(post.createdAt).format("DD MMMM YYYY HH:mm")}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography variant="h6" color="text.secondary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Like" onClick={() => setLiked(!liked)}>
          <MoodIcon sx={{ color: liked ? "green" : "inherit" }} />
        </IconButton>

        <IconButton
          onClick={() => setcommentsOpen(!commentsOpen)}
          aria-label="Comment"
          sx={{ color: commentsOpen ? "purple" : "inherit" }}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      </CardActions>
      {commentsOpen && <Comments comments={post.comments} />}
    </Card>
  );
}
