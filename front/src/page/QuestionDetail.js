import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { withStyles } from "@material-ui/core/styles";
import QuestionCode from "../component/QuestionAbout";
import QuestionAbout from "../component/QuestionCode";
import QuestionMain from "../component/QuestionMain";

const QuestionDetail = () => {
  const [content, setContent] = useState();
  const selectquestion = (item) => {
    const { name } = item.target;
    console.log(name);
    setContent(name);
    
    const question = {
      language: "Python",
    source: "백준",
    category: "디버깅",
    algorithm: "BFS",
    title: "테케는 다 맞는데 17%에서 시간초과 나네요,,,",
    uerid: "A508",
    reservation: "21:30",
    point: "20",
    question_id: "123",
  };
};
  const category = {
    main: <QuestionMain />,
    question: <QuestionAbout />,
    code: <QuestionCode />,
  };
  const aboutcomponent = ["메인", "문제", "코드"];
  return (
    <Box>
      <Grid container>
        <Grid item xs={4}>
          <Button
            onClick={selectquestion}
            name="main"
            value="main2"
            variant="contained"
          >
            메인
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={selectquestion} name="code" variant="contained">
            코드
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={selectquestion} name="question" variant="contained">
            문제
          </Button>
        </Grid>
      </Grid>

        {content && <Box>{category[content]}</Box>}

      
    </Box>
  );
};

export default QuestionDetail;
