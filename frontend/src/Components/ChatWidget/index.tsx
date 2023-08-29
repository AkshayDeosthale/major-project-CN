import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { WidgetContainer } from "./ChatWidget.styles";

const ChatWidget = () => {
  return (
    <WidgetContainer>
      <Accordion>
        <AccordionSummary
          expandIcon={<KeyboardArrowUpIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </WidgetContainer>
  );
};

export default ChatWidget;
