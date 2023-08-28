import { Link } from "react-router-dom";
import { CardContainer, Heading, LoginContainer } from "./Login.Styles";

const Login = () => {
  return (
    <LoginContainer>
      <CardContainer variant="elevation" elevation={3}>
        <Heading>Quora</Heading>
        <Link to={"/"}>Homepage</Link>
      </CardContainer>
    </LoginContainer>
  );
};

export default Login;
