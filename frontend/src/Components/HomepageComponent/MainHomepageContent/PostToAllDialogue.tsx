/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { INTERESTS } from "../../../GLOBAL_CONSTANTS";
import { useForm } from "react-hook-form";
import AxiosInstance from "../../../Configs/AxiosInstance";
import { useCookies } from "react-cookie";

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  fetchTimelinePosts: any;
}

export default function PostToAllDialogue({
  handleClose,
  open,
  setTitle,
  title,
  fetchTimelinePosts,
}: Props) {
  //interest
  const [Interest, setInterest] = React.useState("Technology");
  const [cookies] = useCookies(["userID", "userDetail", "quoraSession"]);

  //form and api
  const {
    register,

    reset,
    getValues,
    setValue,
  } = useForm();

  const handleChange = (event: SelectChangeEvent) => {
    setValue("interestType", event.target.value);
    setInterest(event.target.value as string);
  };

  const handlePost = async () => {
    const data = {
      to: "general@user",
      from: cookies.userID,
      title: title,
      interestType: Interest,
      description: getValues("description"),
    };
    try {
      const res = await AxiosInstance.post(`/posts/create`, data);
      console.log(res);

      handleClose();
      setTitle("");
      reset();
      fetchTimelinePosts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setTitle("");
    handleClose();
  };

  React.useEffect(() => {
    reset();
  }, [open]);

  return (
    <form style={{ width: "100%" }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ask everyone</DialogTitle>
        <DialogContent sx={{ width: { xs: "300px", md: "500px" } }}>
          <FormControl margin="normal" color="secondary" size="small" fullWidth>
            <Select value={Interest} onChange={handleChange}>
              {INTERESTS.map((interest, key) => (
                <MenuItem key={key} value={interest.title}>
                  {interest.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            color="secondary"
            margin="dense"
            label="Question"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            multiline
            rows={4}
            color="secondary"
            margin="normal"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            {...register("description")}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleCancel}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={handlePost}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
