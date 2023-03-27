import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { userinfoAction } from "../redux/actions/userinfoAction";
import ImageUploader from "react-images-upload";
import { useNavigate } from 'react-router-dom';


export default function SingUp() {
  const [inputs, setInputs] = useState({
    identity: "",
    password: "",
    nickname: "",
    language: 0,
    name: "",
    email: "",
    phone: "",
    academicAbility: "",
    workplace: "",
    baekjoonId: "",
    award: "",
    lectureCount:10,
    point:0,
    temperature:0,
    profileImage:"",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pythonchecked, setpythonChecked] = React.useState(false);
  const [javachecked, setjavaChecked] = React.useState(false);
  const [cchecked, setcChecked] = React.useState(false);
  const [pictures, setPictures] = useState([]);
  const onDrop = picture => {
    setPictures({...pictures, picture});
  };
  const languageArray = [pythonchecked, javachecked, cchecked];
  const languagecount = [1, 2, 4];
  const pythonChange = (event) => {
    setpythonChecked(event.target.checked);
    languageCalculator();
  };
  const javaChange = (event) => {
    setjavaChecked(event.target.checked);
    languageCalculator();
  };
  const cChange = (event) => {
    setcChecked(event.target.checked);
    languageCalculator();
  };
  const languageCalculator = () => {
    let temp = 0;
    for (let i = 0; i < 3; i++) {
      if (languageArray[i] === true) {
        temp += languagecount[i];
      }
    }
    inputs["language"] = temp;
  };

  const regist= ()=> {
    const params = new FormData();
    const json = JSON.stringify(inputs);
    const blob = new Blob([json], { type: "application/json" });
    params.append("user", blob);
    params.append("profile", pictures.picture[0]);
    dispatch(userinfoAction.signUp(params));
    navigate(`/`);
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
  };
  return (
    <div>
      <Grid container component="main" sx={{ height: "80vh" }}>
        <Grid item sm={6} md={6} square component={Paper}>
          
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <ImageUploader
              withIcon={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              singleImage
              withPreview
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="identity"
              label="아이디를 입력해주세요"
              name="identity"
              autoFocus
              size="small"
              onChange={onChangeHandler}
              value={inputs.identity}
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
              onChange={onChangeHandler}
              value={inputs.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="이름을 입력해주세요"
              name="name"
              type="text"
              id="name"
              size="small"
              onChange={onChangeHandler}
              value={inputs.name}
            />
            <TextField
              margin="normal"
              id="nickname"
              name="nickname"
              fullWidth
              label="닉네임을 입력해주세요"
              defaultValue=""
              autoFocus
              size="small"
              onChange={onChangeHandler}
              value={inputs.nickname}
            />
            <TextField
              margin="normal"
              fullWidth
              name="baekjoonId"
              id="baekjoonId"
              label="백준아이디를 입력해주세요"
              size="small"
              onChange={onChangeHandler}
              value={inputs.baekjoonId}
            />
            <TextField
              margin="normal"
              fullWidth
              name="email"
              id="email"
              label="email을 입력해주세요"
              size="small"
              onChange={onChangeHandler}
              value={inputs.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              id="phone"
              label="전화번호를 입력해주세요"
              size="small"
              onChange={onChangeHandler}
              value={inputs.phone}
            />
            <TextField
              margin="normal"
              fullWidth
              id="language"
              name="language"
              label=""
              size="small"
              defaultValue="주언어를 선택해주세요(중복가능)"
              InputProps={{
                readOnly: true,
                "aria-label": "controlled",
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
            <TextField
              margin="normal"
              fullWidth
              name="academicAbility"
              id="academicAbility"
              label="학력을 입력해주세요"
              size="small"
              onChange={onChangeHandler}
              value={inputs.academicAbility}
            />
            <TextField
              margin="normal"
              fullWidth
              name="workplace"
              id="workplace"
              label="직장을 입력해주세요"
              size="small"
              onChange={onChangeHandler}
              value={inputs.workplace}
            />
            <TextField
              margin="normal"
              fullWidth
              name="award"
              id="award"
              label="수상경력을 입력해주세요"
              size="small"
              onChange={onChangeHandler}
              value={inputs.award}
            />{" "}
            <Button
              fullWidth
              variant="contained"
              onClick={regist}
              sx={{ fontFamily:"BMHANNAProOTF" , mt: 3, mb: 2, bgcolor: "#F9D9CA", color: "#917B56" , borderColor: "#005cbf" }}
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
          xs="auto"
          sx={{
            backgroundSize: 690,
            backgroundImage: "url(/img/mmclogo.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        

      </Grid>
    </div>
  );
}
