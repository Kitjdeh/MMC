import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import QuestionAbout from "../component/QuestionAbout";
import QuestionCode from "../component/QuestionCode";
import QuestionMain from "../component/QuestionMain";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector, useStore } from "react-redux";
import { questionAction } from "../redux/actions/questionAction";
import { Cookies } from "react-cookie";
import QuestionModify from "../component/QuestionModify";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const QuestionDetail = () => {
  let questionId = useParams();
  let id = questionId.id;

  const question = useSelector((state) => state.question.question);

  const dispatch = useDispatch();
  const getQuestion = () => {
    dispatch(questionAction.getQuestionDetail(id));
  };
  const getAllTrainers = () => {
    dispatch(questionAction.getTrainers(id));
  };
  const deleteQuestion = () => {
    dispatch(questionAction.deleteQuestion(id));
  };
  useEffect(() => {
    getQuestion();
    getAllTrainers();
  }, []);

  const [content, setContent] = useState();
  const [userauth, setUserauth] = useState(false);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  useEffect(() => {
    console.log("id확인전", userauth);
    console.log("문제아이디", question["userId"]);
    console.log("유저아이디", userId);
    setUserauth(userId == question["userId"] ? true : false);
    console.log("id확인후", userauth);
  }, [question]);

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
  const TabLeft = styled(Grid)(({ theme }) => ({
    textAlign: "left",
  }));
  const TabRight = styled(Grid)(({ theme }) => ({
    textAlign: "right",
    paddingRight: 25,
  }));
  const ButtonIcon = styled(Button)(({ theme }) => ({
    backgroundColor: "#fff",
    color: "#917B56",
    border: "none",
  }));
  return (
    <Box>
      <Grid container direction="row" alignItems="flex-start" margin={2}>
        <TabLeft item xs={3}>
          <Button
            onClick={selectquestion}
            name="main"
            value="main2"
            variant="contained"
            sx={{
              backgroundColor: "#917B56",
              color: "#F0E4D4",
              fontFamily: "BMHANNAProOTF",
            }}
          >
            메인
          </Button>

          <Button
            onClick={selectquestion}
            name="question"
            variant="contained"
            sx={{
              backgroundColor: "#917B56",
              color: "#F0E4D4",
              fontFamily: "BMHANNAProOTF",
            }}
          >
            문제
          </Button>

          <Button
            onClick={selectquestion}
            name="code"
            variant="contained"
            sx={{
              backgroundColor: "#917B56",
              color: "#F0E4D4",
              fontFamily: "BMHANNAProOTF",
            }}
          >
            코드
          </Button>
        </TabLeft>
        {userauth === true ? (
          <TabRight item xs={9}>
            <ButtonIcon
              onClick={selectquestion}
              name="modify"
              variant="contained"
            >
              <BorderColorIcon></BorderColorIcon>
            </ButtonIcon>
            <ButtonIcon
              onClick={deleteQuestion}
              name="delete"
              variant="contained"
            >
              {" "}
              <DeleteIcon></DeleteIcon>
            </ButtonIcon>
          </TabRight>
        ) : (
          ""
        )}
      </Grid>
      {content && <Box>{category[content]}</Box>}
    </Box>
  );
};

export default QuestionDetail;
