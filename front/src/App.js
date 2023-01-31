import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllQuestion from "./page/AllQuestion";
import Main from "./page/Main";
import LectureNote from "./page/LectureNote";
import Login from "./page/Login";
import MyLecture from "./page/MyLecture";
import MyQuestion from "./page/MyQuestion";
import Point from "./page/Point";
import QuestionDetail from "./page/QuestionDetail";
import SignUp from "././page/SingUp";
import WriteQuestion from "./page/WriteQuestion";
import Navbar from "./component/Navbar";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Button from "@mui/material/Button";
import { fontFamily } from "@mui/system";
import { pink, purple, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d3c3ff",
    },

  },
});

function App() {
  const [authenticate, setAuthenticate] = useState(false); // true면 로그인이 됨
  useEffect(() => {
    console.log("aaa", authenticate);
  }, [authenticate]);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar authenticate={authenticate} />
        <hr/><br/>
        <Box className="body">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/login"
              element={
                <Login
                  setAuthenticate={setAuthenticate}
                  authenticate={authenticate}
                />
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/question" element={<AllQuestion />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
            <Route path="/question/write" element={<WriteQuestion />} />
            <Route path="/mypage/point" element={<Point />} />
            <Route path="/mypage/question" element={<MyQuestion />} />
            <Route path="/mypage/lecture" element={<MyLecture />} />
            <Route path="/lecture/:id" element={<LectureNote />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
