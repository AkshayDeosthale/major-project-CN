import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ChatWidget from "./Components/ChatWidget";
import Layout from "./Components/Layout";
import NotFound from "./Pages/404";
import ActivitiesAndProfile from "./Pages/ActivitiesAndProfile";
import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";

function App() {
  return (
    <div style={{ position: "relative" }}>
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
        <Route path="/activities" element={<ActivitiesAndProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: "2%",
          display: "flex",
          gap: "15px",
        }}
      >
        <ChatWidget />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: "25%",
          display: "flex",
          gap: "15px",
        }}
      >
        <ChatWidget />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: "48%",
          display: "flex",
          gap: "15px",
        }}
      >
        <ChatWidget />
      </Box>
      {/* <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 10,
          display: "flex",
          gap: "15px",
        }}
      >
        <ChatWidget />
        <ChatWidget />
      </Box> */}
    </div>
  );
}

export default App;
