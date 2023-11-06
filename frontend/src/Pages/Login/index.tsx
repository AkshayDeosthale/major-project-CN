/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, TextField } from "@mui/material";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../../Configs/AxiosInstance";
import { CardContainer, Heading, LoginContainer } from "./Login.Styles";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../Redux/hooks";
import { setGlobalUser } from "../../Redux/Slices/user.slice";

type Inputs = {
  email: string;
  password: string;
  OTP: string;
  id: string;
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "quoraSession",
  ]);

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    removeCookie("quoraSession");
    removeCookie("userID");
  }, [[]]);

  const [isValid, setisValid] = useState(false);

  const { register, handleSubmit } = useForm();

  const [id, setid] = useState<any>({});

  const handleLogin = async (data: Inputs) => {
    const newData = { ...data, loginTime: new Date(), MFACode: data.OTP };
    const res = await AxiosInstance.post(`/users/verifymfa`, newData, {
      withCredentials: true,
    });

    dispatch(setGlobalUser(res.data.userDetail));
    const stringDetail = JSON.stringify(id.userDetail);
    localStorage.setItem("users", stringDetail);
    setCookie("userID", data.id);
    toast.success(res.data.message[0]);
    navigate("/");
  };

  const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
    try {
      if (isValid) {
        handleLogin({ ...data, id: id.id });
      } else {
        const newData = { ...data, loginTime: new Date() };
        const res = await AxiosInstance.post(`/users/login`, newData, {
          withCredentials: true,
        });
        setid(res.data.userDetail);

        const nres = await AxiosInstance.post(
          `/users/getmfauth`,
          { ...newData, id: res.data.id },
          {
            withCredentials: true,
          }
        );
        setisValid(true);
      }
    } catch (error: any) {
      toast.error(error.response.data.message[0]);
    }
  };
  return (
    <LoginContainer>
      <CardContainer variant="elevation" elevation={3}>
        <Heading>Quora</Heading>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
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
            {isValid && (
              <TextField
                type="text"
                required
                fullWidth
                size="small"
                color="secondary"
                label="OTP"
                variant="outlined"
                {...register("OTP")}
              />
            )}
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
            {!isValid ? (
              <Button
                size="small"
                color="success"
                sx={{ textTransform: "none" }}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            ) : (
              <Button
                size="small"
                color="success"
                sx={{ textTransform: "none" }}
                variant="contained"
                type="submit"
              >
                submit otp
              </Button>
            )}

            <Button
              size="small"
              color="secondary"
              sx={{ textTransform: "none" }}
              variant="contained"
              type="button"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Box>
        </form>
      </CardContainer>
    </LoginContainer>
  );
};

export default Login;
