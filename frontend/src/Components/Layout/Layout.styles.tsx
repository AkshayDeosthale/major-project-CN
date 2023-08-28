import {
  Box,
  BoxProps,
  IconButton,
  IconButtonProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const AppbarContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  position: "fixed",
  backgroundColor: "white",
  zIndex: 10,
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));
export const AppbarDataContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: { width: "100%" },
  [theme.breakpoints.up("md")]: {
    width: "60%",
  },
}));

export const LayoutHeading = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: "25px",
    fontWeight: 900,
    color: "purple",
    fontFamily: "cursive",
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.up("md")]: {},
  })
);

export const LayoutButtonsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export const LayoutButtons = styled(IconButton)<IconButtonProps>(
  ({ theme }) => ({
    height: "100%",

    borderRadius: "0px",
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.up("md")]: {},
  })
);

export const UserDetailConatiner = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));
