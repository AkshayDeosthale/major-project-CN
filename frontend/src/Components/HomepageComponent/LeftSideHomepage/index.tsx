import { Box } from "@mui/material";
import News from "./News";
import Interests from "./Interests";

const LeftsideHomepage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        position: "fixed",
        width: "28%",
      }}
    >
      <Interests />
      <News />
    </Box>
  );
};

export default LeftsideHomepage;
