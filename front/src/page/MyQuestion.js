import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import QuestionCard from "./../component/QuestionCard";
import { useDispatch } from "react-redux";
import { mypageAction } from "../redux/actions/mypageAction";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { Box } from '@material-ui/core';
import { styled } from "@mui/material/styles";
const Mygrid = styled(Grid)(({ theme }) => ({
  fontFamily: "BMHANNAProOTF",
}));
const Myspan = styled(Box)(() => ({
  fontFamily: "BMHANNAProOTF",
  color: "#917B56",
  padding: "5px 5px 5px 55px",
}));
const Title = styled(Box)(()=> ({
  margin: "50px"
}));
const MyQuestion = () => {
  useEffect(() => {
    getMyQuestion();
  }, []);
  const dispatch = useDispatch();
  const getMyQuestion = () => {
    dispatch(mypageAction.getMyQuestionList(userId)); //userId로 바꿔야됨
  };
  const questionList = useSelector((state) => state.mypage.questions);
  console.log("questions", questionList);

  const cookie = new Cookies();
  const userId = cookie.get("userId");

  return questionList.length > 0 ? (
    <Container>
      <Title><h1>나의 질문</h1></Title>
      <Grid container spacing={1}>
      {questionList.map((question) =>
          question.progress == 0 ? (
            <Mygrid item xl={3} lg={4} md={6}>
              <Myspan> 🔓 채택 전 강의 🔓 </Myspan>
              <QuestionCard question={question} />
            </Mygrid>
          ) : question.progress == 2 ? (
            <Grid item xl={3} lg={4} md={6} sx={{color: "#917B56"}}>
              <Myspan> 🔒 종료된 강의 🔒 </Myspan>
              <QuestionCard question={question} />
              <br />
            </Grid>
          ) : (
            <Grid item xl={3} lg={4} md={6} sx={{color: "#917B56"}}>
              <Myspan> 🔒 진행 중 강의 🔒 </Myspan>
              <QuestionCard question={question} />
              <br />
            </Grid>
          )
        )}
      </Grid>
    </Container>
  ) : (
    <div>내 질문이 없습니다.</div>
  );
};

export default MyQuestion;
