import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";
import UserPage from "./page/UserPage";
import LectureNote from "./page/LectureNote";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { getCookieToken,getUserId } from "./storage/Cookie";
import { authAction } from "./redux/actions/authAction";
const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#917B56",
    },
  },
  typography: {
    "fontFamily": "Roboto"
  }
});
function App() {

  // const dispatch = useDispatch();
  // const userId = getUserId()
  // const refreshToken = getCookieToken();
  // const accessToken = useSelector((state) => state.authToken.accessToken);

  // console.log("리프래쉬토큰부르기");
  // console.log("엑세스토큰", accessToken,userId);
  // if (accessToken === null && refreshToken) {
    // dispatch(authAction.resetToken(refreshToken, userId));
  // }
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/lecture/:id" element={<LectureNote />} />
          <Route path="/*" element={<UserPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}
export default App;
