import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Interests = () => {
  return (
    <Card>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem sx={{ fontFamily: "cursive" }} alignItems="flex-start">
          Your Interests
        </ListItem>
        <ListItem
          secondaryAction={
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <ChevronRightIcon sx={{ color: "purple" }} />
              </IconButton>
            </Box>
          }
        >
          <ListItemText primary="Single-line item" />
        </ListItem>
        <ListItem
          secondaryAction={
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <ChevronRightIcon sx={{ color: "purple" }} />
              </IconButton>
            </Box>
          }
        >
          <ListItemText primary="Single-line item" />
        </ListItem>
        <ListItem
          secondaryAction={
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <ChevronRightIcon sx={{ color: "purple" }} />
              </IconButton>
            </Box>
          }
        >
          <ListItemText primary="Single-line item" />
        </ListItem>
      </List>
    </Card>
  );
};

export default Interests;
