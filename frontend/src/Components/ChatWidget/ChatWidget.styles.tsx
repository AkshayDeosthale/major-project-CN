import { Box, BoxProps, styled } from "@mui/material";

export const WidgetContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: "300px",

  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));

export const Message = styled(Box)<BoxProps & { sender?: boolean }>(
  ({ theme, sender }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: sender
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "5px",
    maxWidth: "80%",
    alignSelf: sender ? "flex-end" : "flex-start",
  })
);

export const MessageList = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  maxHeight: "60vh",
  overflowY: "auto",
  gap: theme.spacing(1),
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
}));

export const UserStatus = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
}));
