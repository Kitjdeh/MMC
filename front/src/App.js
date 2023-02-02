import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";
import UserPage from "./page/UserPage";
import LectureNote from "./page/LectureNote";
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
        <Routes>
          <Route path="/lecture/:id" element={<LectureNote />} />
          <Route path="/*" element={<UserPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
