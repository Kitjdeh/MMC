import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const question = {
  language: "Python",
  source: "백준",
  category: "디버깅",
  algorithm: "BFS",
  title: "테케는 다 맞는데 17%에서 시간초과 나네요,,,",
  uerid: "A508",
  reservation: "21:30",
  point: "20",
  question_id: "123",
  question_number: "3452",
  content:
    "BFS로 다 전부 검사하면서 체크하는데 테케랑은 다 맞고 제출하면 계속 틀리네요,,, 반례가 있으면 반례 같이 부탁드리겠습니다. 접근 방식 문제면 같이 이론도 좀",
};
const user = ["김정민", "김원혁", "기성도"];
const QuestionMain = () => {
  let { id } = useParams();
  const location = useLocation();
  return (
    <Box>
      <Grid className="questiontitlebar">
        <Grid container>
          <Grid item xs={3}>
            제목
          </Grid>

          <Grid item xs={9} className="questiontitlemain">
            {question.title}
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Stack
        direction="row"
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={5}
      >
        <Item>{question.language}</Item>
        <Item>{question.category}</Item>
        <Item>{question.source}</Item>
        <Item>{question.question_number}</Item>
        <Item>{question.point}</Item>
        <Item>{question.reservation}</Item>
      </Stack>
      <br />
      <Grid className="nav-bar" height={50}>
        <Grid container>
          <Grid item xs={3}>
            알고리즘
          </Grid>

          <Grid item xs={9}>
            {question.algorithm}
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Box className="searchbar">{question.content}</Box>
      <Box>
        <br></br>
        <Container>
          <Grid container>
            <Grid item xs={6}>
              <Grid width={250} className="nav-bar">
                문제설명을 신청한 강사 리스트
              </Grid>
              <Grid container direction="column">
                닉네임
                {user.map((name) => (
                  <Grid item>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={3}
                    >
                      <Grid>{name}</Grid>
                      <Grid>프로필</Grid>
                      <Grid>신청하기</Grid>
                    </Stack>
                  </Grid>
                ))}
                <Grid></Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className="nav-bar">
              강사 프로필
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default QuestionMain;
