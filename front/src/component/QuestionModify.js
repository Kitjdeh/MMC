import React, { useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { questionAction } from "../redux/actions/questionAction";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: (theme.palette.mode = "#DFD3C3"),
  padding: theme.spacing(0.5),
  textAlign: "center",
  minWidth: 50,
  fontFamily: "BMHANNAProOTF"
}));

const Bar = styled(Grid)(({ theme }) => ({
  backgroundColor: (theme.palette.mode = "#ffffff"),
  padding: theme.spacing(0.5),
  textAlign: "center",
  fontFamily: "BMHANNAProOTF"
}));

const QuestionModify = ({ question }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [algorithm, setAlgorithm] = useState([]);
  const [inputs, setInputs] = useState(question);

  const lang = ["Python", "Java", "C++"];
  const category = ["알고리즘", "디버깅"];
  const algo = [
    "BFS",
    "DFS",
    "그래프",
    "DP",
    "정렬",
    "그리디",
    "시뮬레이션",
    "분할정복",
    "순열",
    "조합",
    "부분집합",
    "최소스패닝트리",
    "기타",
  ];
  const source = ["백준", "프로그래머스"];

  const dispatch = useDispatch();
  const submitQuestion = () => {
    dispatch(questionAction.modifyQuestion(inputs));
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
  };

  const onChangeMultiHandler = (e) => {
    const { value } = e.target;
    setAlgorithm(typeof value === "string" ? value.split(",") : value);
    transBitmask();
  };

  const transBitmask = () => {
    let algobit = 0;
    algorithm.map((element) => {
      algobit = algobit | (1 << element);
    });
    console.log(algorithm);
    const nextInputs = {
      ...inputs,
      algorithm: algobit,
      reservation: startDate,
    };
    console.log(nextInputs);
    setInputs(nextInputs);
  };
  console.log("문제props확인", question);
  return (
    <Box component="form">
      <Item sx={{ mb: 3 }}>
        <TextField
          required
          hiddenLabel
          variant="standard"
          fullWidth
          id="title"
          label="제목"
          name="title"
          value={inputs.title}
          onChange={onChangeHandler}
          autoFocus
          inputProps={{style: { paddingLeft: "10px" , fontFamily: "BMHANNAProOTF" , color: "#917B56" }}}
          style={{ fontFamily: "BMHANNAProOTF" , background: "#fff" }}
        />
      </Item>
      <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
        <Bar item xs={3}>
          <Item>
            <TextField
              select
              required
              fullWidth
              id="language"
              label="언어"
              name="language"
              value={inputs.language}
              onChange={onChangeHandler}
              style={{ fontFamily: "BMHANNAProOTF" , background: "#fff" }}
              inputProps={{  paddingLeft: "10px" , fontFamily: "BMHANNAProOTF" , style: { color: "#917B56" }}}
              autoFocus
            >
              {lang.map((name, index) => (
                <MenuItem key={index} value={index}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Item>
        </Bar>
        <Bar item xs={3}>
          <Item>
            <TextField
              select
              required
              fullWidth
              id="category"
              label="카테고리"
              name="category"
              value={inputs.category}
              onChange={onChangeHandler}
              autoFocus
              inputProps={{style: {  paddingLeft: "10px" , fontFamily: "BMHANNAProOTF" , color: "#917B56" }}}
              style={{ fontFamily: "BMHANNAProOTF" , background: "#fff" }}
            >
              {category.map((name, index) => (
                <MenuItem key={index} value={index}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Item>
        </Bar>
        <Bar item xs={3}>
          <Item>
            <Select
              required
              fullWidth
              multiple
              id="algorithm"
              label="알고리즘"
              name="algorithm"
              value={algorithm}
              onChange={onChangeMultiHandler}
              autoFocus
              inputProps={{style: {  paddingLeft: "10px" , fontFamily: "BMHANNAProOTF" , color: "#917B56" }}}
              style={{ fontFamily: "BMHANNAProOTF" , background: "#fff" }}
            >
              {algo.map((name, index) => (
                <MenuItem key={index} value={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Item>
        </Bar>
      </Grid>

      <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
        <Bar item xs={2}>
          <Item>
            <TextField
              select
              required
              fullWidth
              id="source"
              label="문제출처"
              name="source"
              value={inputs.source}
              onChange={onChangeHandler}
              autoFocus
              inputProps={{style: {  paddingLeft: "10px" , fontFamily: "BMHANNAProOTF" , color: "#917B56" }}}
              style={{ fontFamily: "BMHANNAProOTF" , background: "#fff" }}
            >
              {source.map((name, index) => (
                <MenuItem key={index} value={index}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Item>
        </Bar>
        <Bar item xs={2}>
          <Item>
            <TextField
              int
              required
              fullWidth
              id="point"
              label="포인트설정"
              name="point"
              value={inputs.point}
              onChange={onChangeHandler}
              autoFocus
              inputProps={{style: {  paddingLeft: "10px" , fontFamily: "BMHANNAProOTF" , color: "#917B56" }}}
              style={{ fontFamily: "BMHANNAProOTF" , background: "#fff" }}
            ></TextField>
          </Item>
        </Bar>
        <Bar item xs={2}>
          <Item>
            <TextField
              int
              required
              hiddenLabel
              fullWidth
              id="question_number"
              label="문제번호"
              name="questionNumber"
              value={inputs.questionNumber}
              onChange={onChangeHandler}
              autoFocus
              inputProps={{style: {  paddingLeft: "10px" , fontFamily: "BMHANNAProOTF" , color: "#917B56" }}}
              style={{ fontFamily: "BMHANNAProOTF" , background: "#fff" , color: "#917B56" }}
            ></TextField>
          </Item>
        </Bar>
        <Bar item xs={2}>
          <Typography
            component="h5"
            variant="body1"
            style={{ fontFamily: "BMHANNAProOTF" , backgroundColor: "#fff" , color: "#917B56"}}
          >
            시간을 입력해 주세요
          </Typography>
          <Item>
            <DatePicker
              className="react-datepicker"
              fullWidth
              defaultValue={question.startDate}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="yyyy-MM-dd hh:mm:ss a"
              form="external-form"
              
              sx={{ fontFamily: "BMHANNAProOTF" , color: "#917B56", backgroundColor: "#fff" }}
            />
          </Item>
        </Bar>
      </Grid>

      <Item sx={{ mb: 3 }}>
        <TextField
          required
          fullWidth
          multiline
          defaultValue={question.content}
          id="content"
          name="content"
          autoFocus
          value={inputs.content}
          onChange={onChangeHandler}
          style={{ backgroundColor: "#fff" }}
          inputProps={{style: {  paddingLeft: "10px" , color: "#917B56" , fontFamily: "BMHANNAProOTF"}}}
          rows={4}
        />
      </Item>

      <Item sx={{ mb: 3 }}>
        <TextField
          required
          fullWidth
          defaultValue={question.code}
          id="code"
          name="code"
          autoFocus
          multiline
          value={inputs.code}
          rows={4}
          onChange={onChangeHandler}
          style={{ backgroundColor: "#fff" }}
          inputProps={{style: {  paddingLeft: "10px" , color: "#917B56" , fontFamily: "BMHANNAProOTF"}}}
        />
      </Item>
      <Item elevation={0} sx={{ backgroundColor: "#ffffff" }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            textAlign: "center",
            margin: 2,
            width: 100,
            fontFamily: "BMHANNAProOTF",
          }}
          onClick={submitQuestion}
        >
          등록
        </Button>
      </Item>
    </Box>
  );
};
export default QuestionModify;
