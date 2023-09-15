/* eslint-disable @typescript-eslint/no-unused-vars */
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useAppSelector } from "../../../Redux/hooks";

const Interests = () => {
  const interestList = useAppSelector((state) => state.users.interests);

  return (
    <Card>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem sx={{ fontFamily: "cursive" }} alignItems="flex-start">
          Your Interests
        </ListItem>
        {interestList?.map((interest, key) => (
          <ListItem
            key={key}
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
            <ListItemText primary={interest} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Interests;
