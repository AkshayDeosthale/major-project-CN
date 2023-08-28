import { Avatar, Box, Divider } from "@mui/material";
import {
  WriteAskButton,
  WritePostContainer,
  WritePostInput,
} from "./MainHomepageContent.styles";

const WritePost = () => {
  return (
    <WritePostContainer>
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
        <WriteAskButton> Ask Someone</WriteAskButton>
        <Divider orientation="vertical" flexItem />
        <WriteAskButton> Ask </WriteAskButton>
      </Box>
    </WritePostContainer>
  );
};

export default WritePost;
