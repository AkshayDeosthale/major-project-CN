import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const LoginContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundImage: "url('/loginbg.avif')",
  height: "100vh",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));

export const CardContainer = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "100%",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "50%",
    minHeight: "50%",
  },
}));

export const Heading = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "35px",
  color: "purple",
  fontFamily: "cursive",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));
