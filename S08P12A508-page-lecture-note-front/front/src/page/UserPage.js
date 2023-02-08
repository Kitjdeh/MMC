import React from "react";
import Login from "./Login";
import MyQuestion from "./MyQuestion";
import Point from "./Point";
import QuestionDetail from "./QuestionDetail";
import SignUp from "./SingUp";
import WriteQuestion from "./WriteQuestion";
import Navbar from "../component/Navbar";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import AllQuestion from "./AllQuestion";
import Main from "./Main";
import MyLecture from "./MyLecture";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d3c3ff",
    },
  },
});
const UserPage = () => {
  return (
    <div>
      <Navbar />
      <Box className="body">
        <Routes>
          {" "}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/question" element={<AllQuestion />} />
          <Route path="/question/:id" element={<QuestionDetail />} />
          <Route path="/question/write" element={<WriteQuestion />} />
          <Route path="/mypage/point" element={<Point />} />
          <Route path="/mypage/question" element={<MyQuestion />} />
          <Route path="/mypage/lecture" element={<MyLecture />} />
        </Routes>
      </Box>
    </div>
  );
};

export default UserPage;
