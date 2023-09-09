import { Avatar, Box, Divider } from "@mui/material";
import {
  WriteAskButton,
  WritePostContainer,
  WritePostInput,
} from "./MainHomepageContent.styles";
import { useState } from "react";
import PostToAllDialogue from "./PostToAllDialogue";
import PostToUser from "./PostToUser";

const WritePost = () => {
  const [title, setTitle] = useState<string>("");

  //post all dialogue
  const [openAll, setOpenAll] = useState(false);
  const handleAllClickOpen = () => {
    setOpenAll(true);
  };
  const handleAllClose = () => {
    setOpenAll(false);
  };

  //post all dialogue
  const [openUserSpecific, setOpenUserSpecific] = useState(false);
  const handleUserSpecificClickOpen = () => {
    setOpenUserSpecific(true);
  };
  const handleUserSpecificClose = () => {
    setOpenUserSpecific(false);
  };

  return (
    <WritePostContainer>
      <PostToAllDialogue
        fetchTimelinePosts={() => {}}
        handleClose={handleAllClose}
        open={openAll}
        setTitle={setTitle}
        title={title}
      />
      <PostToUser
        fetchTimelinePosts={() => {}}
        handleClose={handleUserSpecificClose}
        open={openUserSpecific}
        setTitle={setTitle}
        title={title}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Avatar src="/1.jpg" sx={{ width: 28, height: 28 }} alt="hi" />
        <WritePostInput
          color="warning"
          placeholder="What do you want to ask or share?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          pt: "10px",
          gap: "10px",
        }}
      >
        <WriteAskButton onClick={handleUserSpecificClickOpen}>
          Ask Someone
        </WriteAskButton>
        <Divider orientation="vertical" flexItem />
        <WriteAskButton onClick={handleAllClickOpen}> Ask </WriteAskButton>
      </Box>
    </WritePostContainer>
  );
};

export default WritePost;
