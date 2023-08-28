import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import NotFound from "./Pages/404";
import HomePage from "./Pages/Homepage";
import Layout from "./Components/Layout";

function App() {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
