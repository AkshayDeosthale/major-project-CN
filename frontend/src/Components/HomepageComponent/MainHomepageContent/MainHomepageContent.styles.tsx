import {
  Box,
  BoxProps,
  ButtonProps,
  Card,
  CardProps,
  InputProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const WritePostContainer = styled(Card)<CardProps>(({ theme }) => ({
  width: "97%",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));

export const MainContentContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));

export const WritePostInput = styled("input")<InputProps>(({ theme }) => ({
  width: "100%",
  height: "30px",
  borderRadius: "40px",
  border: "none",
  position: "relative",
  backgroundColor: "#f1f2f2",
  padding: "5px 5px 5px 20px",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));

export const WriteAskButton = styled("button")<ButtonProps>(({ theme }) => ({
  width: "50%",
  height: "25px",
  backgroundColor: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "purple",
    color: "white",
  },
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));

export const PostNameAndFollowContainer = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    gap: "8px",
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.up("md")]: {},
  })
);
