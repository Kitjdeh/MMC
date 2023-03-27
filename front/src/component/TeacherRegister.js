import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { questionAction } from "./../redux/actions/questionAction";
import { useDispatch, useSelector } from "react-redux";
import { noteAction } from "./../redux/actions/noteAction";
import { Cookies } from "react-cookie";
import { adminAction } from './../redux/actions/adminAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F9D9CA" , 
  color: "#917B56",
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
  fontFamily: "BMHANNAProOTF",
}));
const Word = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
}));

const TeacherRegister = ({ nickname, temperature,writeId, cancelregister, select  }) => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const question = useSelector((state) => state.question.question);
  const trainer = useSelector((state) => state.admin.user);
  const dispatch = useDispatch();
  const deleteTrainer = () => {
    dispatch(questionAction.deleteTrainer(question.questionId, userId));
  };
  const acceptTrainer = () => {
    question.progress = writeId;
    dispatch(questionAction.acceptTrainer(question.questionId, writeId));
    console.log("before");
    dispatch(noteAction.makeLectureNote(question.questionId));
    console.log("after");
    dispatch(questionAction.modifyQuestion(question));
  };
  
  const getUserInfo = () => {
    console.log("GETUSERINFO")
    dispatch(adminAction.getUserInfo(writeId));
    console.log(trainer);
    select(trainer.userId);
  };
  
  console.log(question)

  return (
    <Word>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Item sx={{ maxWidth: 50 }} onClick={()=>getUserInfo()}>
          {nickname}
        </Item>
        <Item sx={{ maxWidth: 50 }} onClick={()=>getUserInfo()}>
          {temperature}
        </Item>
        
        {userId == question?.userId ? (
          <Item onClick={acceptTrainer}>채택하기</Item>
        ) : userId == writeId ? (
          <Item onClick={deleteTrainer}>신청 취소</Item>
        ) : (
          <Item>{cancelregister}</Item>
        )}
      </Stack>
    </Word>
  );
};

export default TeacherRegister;
