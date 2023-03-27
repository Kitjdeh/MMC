import React,{useEffect} from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import QuestionCard from './../component/QuestionCard';
import { useDispatch } from 'react-redux';
import { mypageAction } from "../redux/actions/mypageAction";
import { useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import { styled } from "@mui/material/styles";
import { Box } from '@material-ui/core';
const Mygrid = styled(Grid)(({ theme }) => ({
  fontFamily: "BMHANNAProOTF",
}));
const Title = styled(Box)(()=> ({
  margin: "50px"
}));
const Myspan = styled(Box)(() => ({
  fontFamily: "BMHANNAProOTF",
  color: "#917B56",
  padding: "5px 5px 5px 55px",
}));
const MyLecture = () => {
  useEffect(() => {
    getMyLecture();
  }, [])
  const dispatch = useDispatch();
  const getMyLecture = () =>{
    dispatch(mypageAction.getMyLectureList(userId));  //userId로 바꿔야됨
  }
  const lecturesList = useSelector((state) => state.mypage.lectures);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  return (
   lecturesList.length > 0 ? (
      <Container>
        <Title><h1>나의 강의</h1></Title>
        <Grid container spacing={1}>
        {lecturesList.map((lecture) =>
          lecture.progress == 0 ? (
            <Mygrid item xl={3} lg={4} md={6}>
              <Myspan> 🔓 채택 전 강의 🔓 </Myspan>
              <QuestionCard question={lecture} />
            </Mygrid>
          ) : lecture.progress == 2 ? (
            // <Grid item xl={3} lg={4} md={6} sx={{color: "#917B56" , textAlign: "center"}}>
            <Grid item xl={3} lg={4} md={6} sx={{color: "#917B56"}}>
              <Myspan> 🔒 종료된 강의 🔒 </Myspan>
              <QuestionCard question={lecture} />
              <br />
            </Grid>
          ) : (
            <Grid item xl={3} lg={4} md={6} sx={{color: "#917B56"}}>
              <Myspan> 🔒 진행 중 강의 🔒 </Myspan>
              <QuestionCard question={lecture} />
              <br />
            </Grid>
          )
        )}
      </Grid>
    </Container>
  ) : (
    <div>내 강의가 없습니다.</div>
  )
  );
}

export default MyLecture
