import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {questionAction}from "../redux/actions/questionAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: (theme.palette.mode = "#f6edff"),
  padding: theme.spacing(0.5),
  textAlign: "center",
  minWidth: 50,
}));
const Bar = styled(Grid)(({ theme }) => ({
  backgroundColor: (theme.palette.mode = "#f6edff"),
  padding: theme.spacing(0.5),
  textAlign: "center",
}));

const WriteQuestion = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [algorithm, setAlgorithm] = useState([]);
  const [inputs, setInputs] = useState({
    userId: 1,  //수정 필요
    language: 0, 
    progress: 0,
    category: 0,
    algorithm: 0,
    source: 0,
    questionNumber: 0, 
    title: "",
    content: "",
    reservation: "",
    code: "", 
    point: 0, 
    // date: moment().format('yyyy-MM-DD HH:mm:ss')
  });

  const lang = [
    'Python',
    'Java',
    'C++',
  ];
  const category = [
    '알고리즘',
    '디버깅',
  ];
  const algo = [
    'BFS',
    'DFS',
    '그래프',
    'DP',
    '정렬',
    '그리디',
    '시뮬레이션',
    '분할정복',
    '순열',
    '조합',
    '부분집합',
    '최소스패닝트리',
    '기타',
  ];
  const source = [
    '백준',
    '프로그래머스'
  ];

  const dispatch = useDispatch();
  const submitQuestion = () => {
    dispatch(questionAction.writeQuestion(inputs));
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
		const { name, value } = e.target
		const nextInputs = { ...inputs,  [name]: value}
		setInputs(nextInputs);      
  }

  const onChangeMultiHandler = (e) => {
    const {value} = e.target;
    setAlgorithm(
        typeof value === 'string' ? value.split(',') : value,
    );
    // if(e.target.name==="algorithm"){
    //   setAlgorithm(  
    //     typeof value === 'string' ? value.split(',') : value,
    //   );
    // }
    transBitmask();
  }
  
  const transBitmask = () =>{
    let algobit=0;
    algorithm.map((element)=>{
      algobit = algobit | 1<<element;
    });
    console.log(algorithm)
    const nextInputs = { ...inputs,  algorithm:algobit, reservation:startDate };
    console.log(nextInputs);
    setInputs(nextInputs);
  }

  return (
    <Box component="form">
      <Bar margin="normal">
        <TextField
          required
          fullWidth
          id="title"
          label="제목을 입력해 주세요"
          name="title"
          variant="outlined"
          value={inputs.title}
          onChange={onChangeHandler}
          autoFocus
        />
      </Bar>
      <Grid container justifyContent="space-between">
        <Grid item xs={3}>
          <Select
            required
            fullWidth
            id="language"
            label="언어를 선택해주세요"
            name="language"
            value={inputs.language}
            onChange={onChangeHandler}
            autoFocus
          >
            {lang.map((name, index) => (
            <MenuItem
              key={index}
              value={index}
            >
              {name}
            </MenuItem>
          ))}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            required
            fullWidth
            id="category"
            label="카테고리를 선택해주세요"
            name="category"
            value={inputs.category}
            onChange={onChangeHandler}
            autoFocus
          >
             {category.map((name, index) => (
            <MenuItem
              key={index}
              value={index}
            >
              {name}
            </MenuItem>
          ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <Select
            required
            fullWidth
            multiple
            id="algorithm"
            label="알고리즘을 선택해주세요"
            name="algorithm"
            value={algorithm}
            onChange={onChangeMultiHandler}
            autoFocus
          >
             {algo.map((name, index) => (
            <MenuItem
              key={index}
              value={index}
            >
              {name}
            </MenuItem>
          ))}
          </Select>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container justifyContent="space-between">
        <Grid item xs={3}>
          <TextField
            select
            required
            fullWidth
            id="source"
            label="문제출처를 선택해 주세요"
            name="source"
            value={inputs.source}
            onChange={onChangeHandler}
            autoFocus
          >
             {source.map((name, index) => (
            <MenuItem
              key={index}
              value={index}
            >
              {name}
            </MenuItem>
          ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            int
            required
            fullWidth
            id="point"
            label="포인트를 설정해 주세요"
            name="point"
            value={inputs.point}
            onChange={onChangeHandler}
            autoFocus
          ></TextField>

          <TextField
            required
            fullWidth
            id="question_number"
            label="문제번호를 입력해주세요"
            name="questionNumber"
            value={inputs.questionNumber}
            onChange={onChangeHandler}
            autoFocus
          ></TextField>
        </Grid>
        <Grid item xs={3}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="yyyy-MM-dd hh:mm:ss a"
            form="external-form"
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Box margin="normal">
        <TextField
          className="questiontitlebar"
          required
          fullWidth
          multiline
          id="content"
          label="궁금한 내용을 적어주세요"
          name="content"
          autoFocus
          value={inputs.content}
          onChange={onChangeHandler}
        />
      </Box>
      <br />
      <br />
      <Box className="questiontitlebar" margin="normal">
        <TextField
          required
          fullWidth
          id="code"
          label="질문할 코드를 입력해 주세요"
          name="code"
          autoFocus
          multiline
          value={inputs.code}
          onChange={onChangeHandler}
        />
      </Box>

      <Button
        sx={{
          backgroundColor: "#f6edff",
          textAlign: "center",
          margin: 2,
          width: 100,
        }}
        onClick={submitQuestion}
      >
        작성
      </Button>
    </Box>
  
  );
};

export default WriteQuestion;