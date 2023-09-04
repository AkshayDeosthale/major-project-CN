/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { INTERESTS, USER_URL } from "../../GLOBAL_CONSTANTS";
import { CardContainer, Heading, LoginContainer } from "../Login/Login.Styles";

const RegisterPage = () => {
  const navigate = useNavigate();

  //dialogue state
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleModalClose = (event: any, reason: any) => {
    if (reason && reason == "backdropClick") return;
    handleClose();
  };

  //form and api
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    const newinterests = value.map(
      (val: { title: string; year: number }) => val.title
    );

    const data = {
      username: getValues("username"),
      email: getValues("email"),
      password: getValues("password"),
      interests: newinterests,
    };
    try {
      const res = await axios.post(`${USER_URL}/register`, data);
      toast.success(res.data.message[0]);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message[0]);
    }
  };

  //interests
  const [value, setValue] = useState<any>([]);

  return (
    <LoginContainer>
      <Dialog
        open={open}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select your Interests!"}
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            size="small"
            multiple
            id="tags-standard"
            options={INTERESTS}
            getOptionLabel={(option) => option.title}
            value={value}
            onChange={(event: any, newValue: any) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{ minWidth: { xs: "300px", md: "500px" } }}
                size="small"
                variant="outlined"
                placeholder="Favorites"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="success"
            sx={{ textTransform: "none" }}
            variant="contained"
            type="button"
            onClick={onSubmit}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>

      <CardContainer variant="elevation" elevation={3}>
        <Heading>Quora</Heading>
        <form style={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <TextField
              type="text"
              fullWidth
              required
              size="small"
              color="secondary"
              label="Fullname"
              variant="outlined"
              {...register("username")}
            />
            <TextField
              type="email"
              required
              fullWidth
              size="small"
              color="secondary"
              label="Email"
              variant="outlined"
              {...register("email")}
            />
            <TextField
              type="password"
              required
              fullWidth
              size="small"
              color="secondary"
              label="Password"
              variant="outlined"
              {...register("password")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              gap: "15px",
              mt: "15px",
            }}
          >
            <Button
              size="small"
              color="success"
              sx={{ textTransform: "none" }}
              variant="contained"
              type="button"
              onClick={handleClickOpen}
            >
              Register
            </Button>
            <Button
              size="small"
              color="error"
              sx={{ textTransform: "none" }}
              variant="contained"
              type="button"
              onClick={() => {
                reset();
                navigate("/login");
              }}
            >
              Back
            </Button>
          </Box>
        </form>
      </CardContainer>
    </LoginContainer>
  );
};

export default RegisterPage;
