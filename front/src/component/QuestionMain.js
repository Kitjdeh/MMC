import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import TeacherCard from "./TeacherCard";
import TeacherRegister from "./TeacherRegister";
import { Button } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#f6edff" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  minWidth: 50,
}));
const Bar = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#f6edff" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
}));
// const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
const user = [
  { nickname: "김정민", temperature: "32", userId: 1 },
  { nickname: "김원혁", temperature: "21", userId: 3 },
  { nickname: "기성도", temperature: "54", userId: 2 },
];
const QuestionMain = ({ question }) => {
  return (
    <Box sx={{ minWidth: 100 }}>
      <Bar sx={{ backgroundColor: "#f6edff" }}>
        <Bar
          container
          spacing={1}
          sx={{ minWidth: 100, backgroundColor: "#f6edff" }}
        >
          <Grid item xs={3}>
            <Item sx={{ backgroundColor: "#f6edff" }}>제목</Item>
          </Grid>

          <Grid item xs={9}>
            <Item>{question.title}</Item>
          </Grid>
        </Bar>
      </Bar>
      <br />
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Item>언어</Item>
        <Item>카테고리</Item>
        <Item>출처</Item>
        <Item>문제번호</Item>
        <Item>포인트</Item>
        <Item>예약시간</Item>
      </Stack>

      <hr />

      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Item>{question.language}</Item>
        <Item>{question.category}</Item>
        <Item>{question.source}</Item>
        <Item>{question.question_number}</Item>
        <Item>{question.point}</Item>
        <Item>{question.reservation}</Item>
      </Stack>
      <br />
      <Bar height={50} sx={{ minWidth: 300, backgroundColor: "#f6edff" }}>
        <Grid container sx={{}}>
          <Bar item xs={2} margin={1}>
            알고리즘
          </Bar>

          <Bar item xs={2} margin={1}>
            {question.algorithm}
          </Bar>
        </Grid>
      </Bar>
      <br />
      <Bar sx={{ minWidth: 400, backgroundColor: "#f6edff" }}>
        {question.content}
      </Bar>
      <Box>
        <Bar>
          <Button>문제풀이 신청</Button>
        </Bar>
        <Container>
          <Grid container justifyContent="space-between">
            <Grid item margin={1} xs={5}>
              <Item sx={{ minWidth: 100, backgroundColor: "#f6edff" }}>
                문제설명을 신청한 강사 리스트
              </Item>
              <Item>
                <TeacherRegister nickname="프로필" temperature="온도" />
                {user.map((item) => (
                  <TeacherRegister
                    nickname={item.nickname}
                    temperature={item.temperature}
                    userId={item.userId}
                  />
                ))}
              </Item>
            </Grid>

            <Grid item margin={1} xs={5}>
              <TeacherCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default QuestionMain;
