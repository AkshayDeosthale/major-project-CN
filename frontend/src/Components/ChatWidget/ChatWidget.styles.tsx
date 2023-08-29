import { Box, BoxProps, styled } from "@mui/material";

export const WidgetContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: "300px",

  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));
