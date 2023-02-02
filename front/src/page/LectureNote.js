import React,{ useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import LectureCode from "../component/LectureCode";
import LectureQuestion from "../component/LectureQuestion";
import LectureWebRTC from "../component/LectureWebRTC";
const LectureNote = () => {
  const Bar = styled(Grid)(({ theme }) => ({
    backgroundColor: (theme.palette.mode = "#f6edff"),
    textAlign: "center",
  }));
  const Word = styled(Grid)(({ theme }) => ({
    textAlign: "center",
  }));
  const [content, setContent] = useState();
  const selectpage = (item) => {
    const { name } = item.target;
    setContent(name);
  };
  const category = {
    main: <LectureWebRTC />,
    question: <LectureQuestion />,
    code: <LectureCode />,
  };
  return (
    <Bar
      container
      justifyContent="space-between"
      sx={{ backgroundColor: "#ffffff" }}
    >
      <Bar item xs={1} sx={{ border: "1px dashed grey" }}>
        {" "}
        버튼
        <Grid container direction="column" alignItems="flex-start" margin={2}>
          <Word item xs={4}>
            <Button
              onClick={selectpage}
              name="main"
              value="main2"
              variant="contained"
              sx={{ backgroundColor: "#c1abff" }}
            >
              메인
            </Button>
          </Word>
          <Word item xs={4}>
            <Button
              onClick={selectpage}
              name="code"
              variant="contained"
              sx={{ backgroundColor: "#c1abff" }}
            >
              코드
            </Button>
          </Word>
          <Word item xs={4}>
            <Button
              onClick={selectpage}
              name="question"
              variant="contained"
              sx={{ backgroundColor: "#c1abff" }}
            >
              문제
            </Button>
          </Word>
        </Grid>
      </Bar>
      <Bar item xs={9} sx={{ border: "1px dashed grey" }}>
        화면
        {content && <Box>{category[content]}</Box>}
      </Bar>
      <Bar item xs={2} sx={{ border: "1px dashed grey" }}>
        채팅창
      </Bar>
    </Bar>
  );
};

export default LectureNote;
