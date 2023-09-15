import { Box, BoxProps, Card, CardProps, styled } from "@mui/material";

export const CardContainer = styled(Card)<CardProps>(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));

export const EditContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));
