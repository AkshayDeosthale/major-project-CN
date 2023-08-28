import { Box } from "@mui/material";
import DrawerAppBar from "./Appbar";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <DrawerAppBar />
      <Box sx={{ paddingTop: "42px" }}>{children}</Box>
    </Box>
  );
};

export default Layout;
