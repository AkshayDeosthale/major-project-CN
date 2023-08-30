/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, TextField } from "@mui/material";
import { CardContainer, Heading, LoginContainer } from "../Login/Login.Styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_URL } from "../../GLOBAL_CONSTANTS";

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
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
    try {
      const res = await axios.post(`${USER_URL}/register`, data);
      navigate("/login");
    } catch (error) {
      console.error(error);
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
          <Button
            size="small"
            color="secondary"
            sx={{ textTransform: "none", mt: "15px" }}
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </form>
      </CardContainer>
    </LoginContainer>
  );
};

export default RegisterPage;
