/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, TextField } from "@mui/material";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../../Configs/AxiosInstance";
import { CardContainer, Heading, LoginContainer } from "./Login.Styles";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../Redux/hooks";
import { setGlobalUser } from "../../Redux/Slices/user.slice";

type Inputs = {
  email: string;
  password: string;
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

  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
    try {
      const res = await AxiosInstance.post(`/users/login`, data, {
        withCredentials: true,
      });

      dispatch(setGlobalUser(res.data.userDetail));
      localStorage.setItem("users", JSON.stringify(res.data.userDetail));
      setCookie("userID", res.data.id);
      toast.success(res.data.message[0]);
      navigate("/");
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
              type="submit"
            >
              Login
            </Button>
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
