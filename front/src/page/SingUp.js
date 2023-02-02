import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
export default function SingUp() {
  const userinfo = {
    userid: "",
    password: "",
    nickname: "",
    language: "",
  };
  const [pythonchecked, setpythonChecked] = React.useState(false);
  const [javachecked, setjavaChecked] = React.useState(false);
  const [cchecked, setcChecked] = React.useState(false);
  console.log("111", cchecked, pythonchecked);
  const pythonChange = (event) => {
    setpythonChecked(event.target.checked);
  };
  const javaChange = (event) => {
    setjavaChecked(event.target.checked);
  };
  const cChange = (event) => {
    setcChecked(event.target.checked);
    console.log(cchecked, pythonchecked);
  };
  return (
    <div>
      <Grid container component="main" sx={{ height: "80vh" }} xs>
        <Grid item sm={6} md={6} square component={Paper}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userid"
              label="아이디를 입력해주세요"
              name="userid"
              autoFocus
              size="small"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              size="small"
            />
            <TextField
              margin="normal"
              id="nickname"
              fullWidth
              label="닉네임을 입력해주세요"
              defaultValue=""
              autoFocus
              size="small"
            />
            <TextField
              margin="normal"
              fullWidth
              name="baekjoon"
              id="baekjoon"
              label="백준아이디를 입력해주세요"
              defaultValue=""
              size="small"
            />
            <TextField
              margin="normal"
              fullWidth
              name="baekjoon"
              id="baekjoon"
              label="백준아이디를 입력해주세요"
              defaultValue=""
              size="small"
            />{" "}
            <TextField
              margin="normal"
              fullWidth
              id="language"
              label=""
              size="small"
              defaultValue="주언어를 선택해주세요(중복가능)"
              InputProps={{
                readOnly: true,
              }}
            />
            <Box>
              <Checkbox
                checked={pythonchecked}
                onChange={pythonChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              python
              <Checkbox
                checked={javachecked}
                onChange={javaChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              java
              <Checkbox
                checked={cchecked}
                onChange={cChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              c++
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "violet", borderColor: "#005cbf" }}
            >
              회원가입
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          component={Paper}
          sm={6}
          md={6}
          maxWidth="xs"
          sx={{
            backgroundImage: "url(/img/mmclogo.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </div>
  );
}
