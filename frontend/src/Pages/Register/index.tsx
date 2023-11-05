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
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../../Configs/AxiosInstance";
import { INTERESTS } from "../../GLOBAL_CONSTANTS";
import { CardContainer, Heading, LoginContainer } from "../Login/Login.Styles";
import { useForm } from "react-hook-form";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  //dialogue state
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    onSubmit();
  };
  const handleModalClose = (event: any, reason: any) => {
    console.log(event);

    if (reason && reason == "backdropClick") return;
    handleClose();
  };

  //form and api
  const {
    register,

    reset,
    getValues,
  } = useForm();
  const onSubmit = async () => {
    const newinterests = value.map(
      (val: { title: string; year: number }) => val.title
    );

    const data = {
      username: getValues("username"),
      email: getValues("email"),
      password: getValues("password"),
      // interests: newinterests,
    };
    try {
      const res = await AxiosInstance.post(`/users/register`, data);
      toast.success(res.data.message[0]);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message[0]);
    }
  };

  const handleSocialLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await AxiosInstance.get(`/users/auth/google`);
      console.log(res);
    } catch (error: any) {
      toast.error(error.response.data.message[0]);
    }
  };

  //interests
  const [value, setValue] = useState<any>([]);

  const responseSuccess = async (response: any) => {
    const { credential } = response;

    try {
      const userProfileResponse = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: {
            Authorization: `Bearer ${credential}`,
          },
        }
      );
      const userData = await userProfileResponse.json();
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }

    // You can also use the token for backend authentication
    const tokenId = response.tokenId;
  };

  const responseError = () => {
    console.log("Error occurred during login.");
  };

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    // setProfile(null);
  };

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
              console.log(event);

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
        {/* <Button onClick={handleSocialLogin}>Social Login</Button> */}
        {/* <GoogleLogin onSuccess={responseSuccess} onError={responseError} /> */}
      </CardContainer>
    </LoginContainer>
  );
};

export default RegisterPage;
