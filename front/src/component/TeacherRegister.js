import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { questionAction } from './../redux/actions/questionAction';
import { useDispatch,useSelector } from "react-redux";
import { userinfoAction } from './../redux/actions/userinfoAction';
import { noteAction } from './../redux/actions/noteAction';
import { Cookies } from 'react-cookie';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f6edff",
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
  maxWidth:400,
}));
const Word = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
}));

const cookie = new Cookies();
const userId = cookie.get("userId");

const TeacherRegister = ({nickname,temperature,userId}) => {
  const question = useSelector((state) => state.question.question);
// console.log("TeacherRegister question",question.questionId);
  const dispatch = useDispatch();
  const deleteTrainer = () => {
    dispatch(questionAction.deleteTrainer(question.questionId, userId)); 
  }
  const acceptTrainer = () => {
    dispatch(questionAction.acceptTrainer(question.questionId, userId)); 
    console.log("before")
    dispatch(noteAction.makeLectureNote(question.questionId));
    console.log("after")
  }
  const getUserInfo = (e) => {
    console.log(e);
    dispatch(userinfoAction.getUserInfo(1));
  }
  return (
    <Word>
      <Stack
        direction="row"
        justifyContent="space-between"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Item sx={{maxWidth:50 }} onClick={getUserInfo}>{nickname}</Item>
        <Item>{temperature}</Item>
        <Item onClick={acceptTrainer}>채택하기</Item>
        <Item onClick={deleteTrainer}>신청 취소</Item>
      </Stack>
    </Word>
  );
};

export default TeacherRegister;
