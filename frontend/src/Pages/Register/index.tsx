/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, TextField } from "@mui/material";
import { CardContainer, Heading, LoginContainer } from "../Login/Login.Styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { USER_URL } from "../../GLOBAL_CONSTANTS";
import { toast } from "react-toastify";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
    try {
      const res = await axios.post(`${USER_URL}/register`, data);

      toast.success(res.data.message[0]);
      navigate("/login");
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
              type="submit"
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
