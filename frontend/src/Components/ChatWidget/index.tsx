import OnlineBadge from "@mui/icons-material/FiberManualRecord";
import OfflineBadge from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Message,
  MessageList,
  UserStatus,
  WidgetContainer,
} from "./ChatWidget.styles";

const ChatWidget = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // handle send message
  };

  return (
    <WidgetContainer>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <UserStatus>
            <Typography variant="subtitle1">User Name</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <OnlineBadge color="success" />
              <OfflineBadge color="error" />
            </Box>
          </UserStatus>
        </AccordionSummary>
        <AccordionDetails>
          <MessageList>
            {/* Replace with actual messages */}
            <Message sender>
              <Typography variant="body1">Hello</Typography>
            </Message>
            <Message>
              <Typography variant="body1">Hi</Typography>
            </Message>
          </MessageList>
        </AccordionDetails>
        <AccordionActions>
          <Box
            sx={{ display: "flex", width: "100%" }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton size="small" color="secondary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </AccordionActions>
      </Accordion>
    </WidgetContainer>
  );
};

export default ChatWidget;
