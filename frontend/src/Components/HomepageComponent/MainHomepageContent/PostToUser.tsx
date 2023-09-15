/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  CircularProgress,
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
import AxiosInstance from "../../../Configs/AxiosInstance";
import { INTERESTS } from "../../../GLOBAL_CONSTANTS";

import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { User } from "../../../Redux/Slices/user.slice";
interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  fetchTimelinePosts: any;
}

interface UserAutocompleteType {
  title: string;
  year: string;
}

export default function PostToUser({
  handleClose,
  open,
  setTitle,
  title,
  fetchTimelinePosts,
}: Props) {
  const {
    register,

    reset,
    getValues,
    setValue,
  } = useForm();

  const [options, setOptions] = React.useState<readonly UserAutocompleteType[]>(
    []
  );
  const [autocompleteOpne, setAutocompleteOpne] = React.useState(false);
  const loading = open && options.length === 0;

  const [cookies] = useCookies(["userID", "quoraSession"]);

  //Users from autocomplete
  const getAllUsers = async () => {
    try {
      const res = await AxiosInstance.get(`/users/all`, {
        withCredentials: true,
      });

      const tempusers: UserAutocompleteType[] = res.data.map((user: User) => {
        if (user.email === "general@user") {
          return {
            title: "All",
            year: user._id,
          };
        } else {
          return {
            title: user.username,
            year: user._id,
          };
        }
      });
      setOptions(tempusers);
    } catch (error) {
      console.log(error);
    }
  };

  //interest
  const [Interest, setInterest] = React.useState("Technology");

  const handleChange = (event: SelectChangeEvent) => {
    setValue("interestType", event.target.value);
    setInterest(event.target.value as string);
  };

  React.useEffect(() => {
    getAllUsers();
  }, []);

  const handlePost = async () => {
    const data = {
      from: cookies.userID,
      to: getValues("to"),
      title,
      interestType: getValues("interestType"),
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
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ask a user</DialogTitle>
        <DialogContent sx={{ width: { xs: "300px", md: "500px" } }}>
          <Autocomplete
            id="asynchronous-demo"
            fullWidth
            open={autocompleteOpne}
            onChange={(event: any, newValue: any) => {
              console.log(event);

              setValue("to", newValue.year);
            }}
            onOpen={() => {
              setAutocompleteOpne(true);
            }}
            onClose={() => {
              setAutocompleteOpne(false);
            }}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="Sent To?"
                color="secondary"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
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
    </div>
  );
}
