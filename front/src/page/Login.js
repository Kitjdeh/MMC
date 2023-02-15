import React, {useMemo} from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { width } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { authAction } from "../redux/actions/authAction";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getRefreshToken, getUserId, getAccessToken} from "../storage/Cookie";
import { Cookies } from "react-cookie";

const Login = () => {
  const [userid, setId] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const store = useStore();
  const loginUser = async () => {
    await dispatch(authAction.userConfirm(userid,password));
    let token=store.getState().authToken.accessToken;
    let isLogin=store.getState().authToken.isLogin;
    
    if(isLogin){
      console.log("123");
      await dispatch(authAction.getUserInfo(token));
    }
    // dispatch(authAction.onLogin(userid, password));
    navigate("/question")
  };


  return (
    <div>
      <Grid
        container
        component="form"
        sx={{ height: "80vh" }}
        xs
      >
        <Grid
          item
          component={Paper}
          sm={6}
          md={6}
          maxWidth="xs"
          sx={{
            // maxWidth: 300,
            // maxHeight: 300,
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
        <Grid item sm={6} md={6} square component={Paper}>
          <Box component="form" noValidate sx={{ mt: 1, alignItems: "center" }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#917B56" }}
            >
              로그인
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userid"
              label="아이디를 입력해주세요"
              name="userid"
              autoFocus
              onChange={(event) => setId(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={loginUser}
              sx={{ mt: 3, mb: 2, bgcolor: "#F9D9CA", color: "#917B56"}}
            >
              코딩하러가기
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signup" variant="body2" underline="none" color="#917B56">
                  회원가입
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" underline="none" color="#917B56">
                  비밀번호 찾기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
