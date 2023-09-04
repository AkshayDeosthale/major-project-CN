/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CardContainer, Heading, LoginContainer } from "./Login.Styles";
import axios from "axios";
import { USER_URL } from "../../GLOBAL_CONSTANTS";
import { toast } from "react-toastify";

type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
    try {
      const res = await axios.post(`${USER_URL}/login`, data, {
        withCredentials: true,
      });

      document.cookie = `user=${res.data.id}`;
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
