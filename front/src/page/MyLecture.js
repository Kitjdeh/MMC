import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import QuestionCard from "./../component/QuestionCard";
import { useDispatch } from "react-redux";
import { mypageAction } from "../redux/actions/mypageAction";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { styled } from "@mui/material/styles";
const Mygrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#f6edff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyLecture = () => {
  useEffect(() => {
    getMyLecture();
  }, []);
  const dispatch = useDispatch();
  const getMyLecture = () => {
    dispatch(mypageAction.getMyLectureList(userId)); //userId로 바꿔야됨
  };
  const lecturesList = useSelector((state) => state.mypage.lectures);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  return lecturesList.length > 0 ? (
    <Container>
      <Grid container spacing={1}>
        {lecturesList.map((lecture) =>
          lecture.progress == userId ? (
            <Mygrid item xl={3} lg={4} md={6}>
              채택된 강의
              <QuestionCard question={lecture} />
            </Mygrid>
          ) : (
            <Grid item xl={3} lg={4} md={6}>
              <QuestionCard question={lecture} />
              <br />
            </Grid>
          )
        )}
      </Grid>
    </Container>
  ) : (
    <div>내 강의가 없습니다.</div>
  );
};

export default MyLecture;
