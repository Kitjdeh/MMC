import React, { useState, useEffect } from "react";
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
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { detailquestionAction } from "../redux/actions/detailquestionAction";
const QuestionDetail = () => {
  let questionId  = useParams();
  let id=questionId.id
  const question = useSelector((state) => state.detailquestion.question);
  const teacherInfo = useSelector((state) => state.userinfo.userinfo);
  const dispatch = useDispatch();
  const getQuestion = () => {
    dispatch(detailquestionAction.getQuestionDetail(id));
  };
  useEffect(() => getQuestion(), []);
  const [content, setContent] = useState();
  const selectquestion = (item) => {
    const { name } = item.target;
    setContent(name);
  };
  const category = {
    main: <QuestionMain question={question} />,
    question: <QuestionAbout />,
    code: <QuestionCode />,
  };
  const aboutcomponent = ["메인", "문제", "코드"];
  const Word = styled(Grid)(({ theme }) => ({
    textAlign: "center",
  }));
  return (
    <Box>
      <Grid container direction="row" alignItems="flex-start" margin={2}>
        <Word item xs={4}>
          <Button
            onClick={selectquestion}
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
            onClick={selectquestion}
            name="code"
            variant="contained"
            sx={{ backgroundColor: "#c1abff" }}
          >
            코드
          </Button>
        </Word>
        <Word item xs={4}>
          <Button
            onClick={selectquestion}
            name="question"
            variant="contained"
            sx={{ backgroundColor: "#c1abff" }}
          >
            문제
          </Button>
        </Word>
      </Grid>

      {content && <Box>{category[content]}</Box>}
    </Box>
  );
};

export default QuestionDetail;