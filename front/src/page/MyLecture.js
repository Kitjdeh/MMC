import React,{useEffect} from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import QuestionCard from './../component/QuestionCard';
import { useDispatch } from 'react-redux';
import { mypageAction } from "../redux/actions/mypageAction";
import { useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';

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
    (lecturesList.length > 0 ?
    <Container>
    <Grid container spacing={1}>
      {lecturesList.map((lecture) => (
        <Grid item  xl={3} lg={4} md={6}>
          <QuestionCard question={lecture}/>
          <br />
        </Grid>
      ))}
    </Grid>
  </Container>:<div>내 강의가 없습니다.</div>
    )
  )
}

export default MyLecture