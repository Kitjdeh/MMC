import React,{useEffect} from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector,useStore } from "react-redux";
import { questionAction } from './../redux/actions/questionAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#c1abff",
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
const TeacherCard = () => {
  const store = useStore();
  const dispatch = new useDispatch();
  const trainer = useSelector((state) => state.userinfo.userinfo);
  // const trainer = store.getState().userinfo.userinfo;
  console.log(trainer.baekjoonId)
  const backjoon = useSelector((state) => state.question.backjoon);
  useEffect(() => {
    console.log("123")
    dispatch(questionAction.getBackJoon(trainer.baekjoonId));
    tier();
  },[trainer])


  const tier = () =>{
    let rank = "";
    let sub = (backjoon.tier+1)%5;
    console.log(parseInt((backjoon.tier-1)/5));
    switch(parseInt((backjoon.tier-1)/5)){
      case 0:
        rank="브론즈 " +sub;
        break;
      case 1:
        rank="실버 " +sub;
        break;
      case 2:
        rank="골드 " +sub;
        break;
      case 3:
        rank="플레티넘 " +sub;
        break;
      case 4:
        rank="다이아 " +sub;
        break;
      case 5:
        rank="루비 " +sub;
        break;
    }
    return rank;
  }
  

  console.log("BACK",backjoon);
  return (
    <Item sx={{ backgroundColor: "#f6edff" ,minWidth:300 }}>
      <Word container direction="row" justifyContent="center" alignItems="center" >
        <Word item xs={4}>
            <img src={trainer.profileImage} width="100%" component="form" noValidate xs sx={{ mt: 1, alignItems: "center" }}/>
        </Word>
        <Word item xs={8}>
            {trainer.nickname}
        </Word>
      </Word>

      <Stack direction="row" justifyContent="center" alignItems="center" sx={{minWidth:200 }}>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>주언어</Word>
          <Item>{trainer.language}</Item>
        </Word>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>온도</Word>
          <Item>{trainer.temperature}</Item>
        </Word>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>백준티어</Word>
          <Item>{tier()}</Item>
        </Word>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>학력</Word>
          <Item>{trainer.academicAbility}</Item>
        </Word>
      </Stack>
      <Box>수상 및 경력
        <Item sx={{minHeight:50 }}>
          {trainer.award}
        </Item>
      </Box>
    </Item>
  );
};

export default TeacherCard;
