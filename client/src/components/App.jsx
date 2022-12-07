import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Category from "../pages/CategoryNews/CategoryNews";
import Layout from "../pages/Layout/Layout";
import News from "../pages/News/News";
import Signin from "../pages/SignIn/SignIn";
import Signup from "../pages/SignUp/SignUp";
import SingleNews from "../pages/SingleNews/SingleNews";

function App() {
  const token = useSelector((state) => state.authSlice.token);
  useEffect(() => {}, [token]);

  if (!token) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/news/" element={<Layout />}>
          <Route path="category/:id" element={<Category />} />
          <Route index element={<News />} />
          <Route path=":id" element={<SingleNews />} />
        </Route>
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/news/" element={<Layout />}>
        <Route path="category/:id" element={<Category />} />
        <Route index element={<News />} />
        <Route path=":id" element={<SingleNews />} />
      </Route>
      <Route path="*" element={<Navigate to="/news" replace />} />
    </Routes>
  );
}

export default App;
