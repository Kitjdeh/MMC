import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { questionAction } from "./../redux/actions/questionAction";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userinfoAction } from "./../redux/actions/userinfoAction";
import { noteAction } from "./../redux/actions/noteAction";
import { Cookies } from "react-cookie";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f6edff",
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
}));
const Word = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
}));

const TeacherRegister = ({ nickname, temperature, writeId, select, cancelregister }) => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const question = useSelector((state) => state.question.question);
  const trainer = useSelector((state) => state.userinfo.userinfo);
  const dispatch = useDispatch();
  const deleteTrainer = () => {
    dispatch(questionAction.deleteTrainer(question.questionId, userId));
  };
  const acceptTrainer = () => {
    question.progress = writeId;
    dispatch(questionAction.acceptTrainer(question.questionId, userId));
    console.log("before");
    dispatch(noteAction.makeLectureNote(question.questionId));
    console.log("after");
    dispatch(questionAction.modifyQuestion(question));
  };
  const getUserInfo = (e) => {
    dispatch(userinfoAction.getUserInfo(writeId));
  };
  return (
    <Word>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        // divider={<Divider orientation="vertical" flexItem />}
      >
        <Item sx={{ maxWidth: 50 }} onClick={(e) => getUserInfo(e)}>
          {nickname}
        </Item>
        {userId == question?.userId && question?.progress == 0 ? (
          <Item onClick={acceptTrainer}>채택하기</Item>
        ) : (
          <Item>{select}</Item>
        )}
        {userId == writeId && question?.progress == 0 ? (
          <Item onClick={deleteTrainer}>신청 취소</Item>
        ) : (
          <Item>{cancelregister}</Item>
        )}
      </Stack>
    </Word>
  );
};

export default TeacherRegister;
