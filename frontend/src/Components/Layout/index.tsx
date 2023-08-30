import { Box } from "@mui/material";
import DrawerAppBar from "./Appbar";
import ChatWidget from "../ChatWidget";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ position: "relative" }}>
      <DrawerAppBar />
      <Box sx={{ paddingTop: "42px" }}>{children}</Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: "2%",
          display: "flex",
          gap: "15px",
        }}
      >
        <ChatWidget />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: "25%",
          display: "flex",
          gap: "15px",
        }}
      >
        <ChatWidget />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: "48%",
          display: "flex",
          gap: "15px",
        }}
      >
        <ChatWidget />
      </Box>
    </Box>
  );
};

export default Layout;
