/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import NotFound from "./Pages/404";
import ActivitiesAndProfile from "./Pages/ActivitiesAndProfile";
import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import { useEffect } from "react";
import { ChatEngine } from "./Configs/ChatEngine";

function App() {
  useEffect(() => {
    // ChatEngine("12", "akshay.deosthale6@gmail.com");
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/activities"
          element={
            <Layout>
              <ActivitiesAndProfile />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
