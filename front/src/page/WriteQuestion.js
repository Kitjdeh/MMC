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

          autoFocus
        />
      </Bar>
      <Grid container justifyContent="space-between">
        <Grid item xs={3}>
          <TextField
            select
            required
            fullWidth
            id="language"
            label="언어를 선택해주세요"
            name="language"
            autoFocus
          >
            <MenuItem>Python</MenuItem>
            <MenuItem>Java</MenuItem>
            <MenuItem>C++</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            required
            fullWidth
            id="category"
            label="카테고리를 선택해주세요"
            name="category"
            autoFocus
          >
            <MenuItem>알고리즘</MenuItem>
            <MenuItem>디버깅</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            required
            fullWidth
            id="algorithum"
            label="알고리즘을 선택해주세요"
            name="algorithum"
            autoFocus
          >
            <MenuItem>BFS</MenuItem>
            <MenuItem>DFS</MenuItem>
            <MenuItem>Tree</MenuItem>
          </TextField>
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
            autoFocus
          >
            <MenuItem>백준</MenuItem>
            <MenuItem>프로그래머스</MenuItem>
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
            autoFocus
          ></TextField>

          <TextField
            required
            fullWidth
            id="question_number"
            label="문제번호를 입력해주세요"
            name="question_number"
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
            dateFormat="MMMM d, yyyy h:mm aa"
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
          id="content"
          label="궁금한 내용을 적어주세요"
          name="content"
          autoFocus
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
        />
      </Box>
    </Box>
  );
};

export default WriteQuestion;
