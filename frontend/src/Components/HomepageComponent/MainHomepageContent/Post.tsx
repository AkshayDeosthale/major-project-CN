import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useState } from "react";
import Comments from "./Comments";
import {
  PostNameAndFollowContainer,
  WriteAskButton,
} from "./MainHomepageContent.styles";

export default function Post() {
  const [commentsOpen, setcommentsOpen] = useState(false);
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
        action={
          <IconButton aria-label="hide">
            <ClearIcon />
          </IconButton>
        }
        title={
          <PostNameAndFollowContainer>
            <Typography sx={{ fontFamily: "cursive" }}>
              Shrimp and Chorizo Paella
            </Typography>
            <WriteAskButton
              sx={{
                width: "70px",
                backgroundColor: "purple",
                color: "white",
              }}
            >
              Follow
            </WriteAskButton>
          </PostNameAndFollowContainer>
        }
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Like">
          <TrendingUpIcon sx={{ color: "red" }} />
        </IconButton>
        <IconButton aria-label="Like">
          <TrendingDownIcon />
        </IconButton>
        <IconButton
          onClick={() => setcommentsOpen(!commentsOpen)}
          aria-label="Comment"
          sx={{ color: commentsOpen ? "purple" : "inherit" }}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      </CardActions>
      {commentsOpen && <Comments />}
    </Card>
  );
}
