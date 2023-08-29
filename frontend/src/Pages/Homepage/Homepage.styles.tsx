import { Box, BoxProps, Grid, GridProps, styled } from "@mui/material";

export const HomepageContainer = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",

  [theme.breakpoints.down("md")]: { padding: "10px" },
  [theme.breakpoints.up("md")]: { padding: "20px" },
}));

export const HomePageStructure = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: { width: "100%" },
  [theme.breakpoints.up("md")]: {
    width: "75%",
  },
}));
