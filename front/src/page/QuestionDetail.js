import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { withStyles } from "@material-ui/core/styles";
import QuestionAbout from "../component/QuestionAbout";
import QuestionCode from "../component/QuestionCode";
import QuestionMain from "../component/QuestionMain";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector, useStore } from "react-redux";
import { questionAction } from "../redux/actions/questionAction";
import { Cookies } from "react-cookie";
import QuestionModify from "../component/QuestionModify";

const QuestionDetail = () => {
  let questionId = useParams();
  let id = questionId.id;
  // const store = useStore();
  const question = useSelector((state) => state.question.question);

  const dispatch = useDispatch();
  const getQuestion = () => {
    dispatch(questionAction.getQuestionDetail(id));
  };
  const getAllTrainers = () => {
    dispatch(questionAction.getTrainers(id));
  };
  useEffect(() => {
    getQuestion();
    getAllTrainers();
  }, []);
  // const question = store.getState().question;

  const [content, setContent] = useState();
  const [userauth, setUserauth] = useState(false);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  useEffect(() => {
    console.log("id확인전",userauth)
    console.log("문제아이디", question["userId"]);
    console.log("유저아이디", userId);
    setUserauth(userId == question["userId"] ? true : false);
    console.log("id확인후",userauth)
  },[question]);

  const selectquestion = (item) => {
    const { name } = item.target;
    setContent(name);
  };
  const category = {
    main: <QuestionMain question={question} />,
    question: <QuestionAbout question={question} />,
    code: <QuestionCode question={question} />,
    modify: <QuestionModify question={question} />,
  };
  const aboutcomponent = ["메인", "문제", "코드"];
  const Word = styled(Grid)(({ theme }) => ({
    textAlign: "center",
  }));
  return (
    <Box>
      <Grid container direction="row" alignItems="flex-start" margin={2}>
        <Word item xs={3}>
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
        <Word item xs={3}>
          <Button
            onClick={selectquestion}
            name="question"
            variant="contained"
            sx={{ backgroundColor: "#c1abff" }}
          >
            문제
          </Button>
        </Word>
        <Word item xs={3}>
          <Button
            onClick={selectquestion}
            name="code"
            variant="contained"
            sx={{ backgroundColor: "#c1abff" }}
          >
            코드
          </Button>
        </Word>
          {userauth === true ? (
            <Word item xs={3}>
              <Button
                onClick={selectquestion}
                name="modify"
                variant="contained"
                sx={{ backgroundColor: "#c1abff" }}
              >
                수정
              </Button>
            </Word>
          ) : (
            <Word item xs={3}>
              {" "}
              ????{" "}
            </Word>
          )}
     
      </Grid>{content ? (<Box>{category[content]}</Box>) : (<Box><QuestionMain question={question} /></Box>)}

    </Box>
  );
};

export default QuestionDetail;
