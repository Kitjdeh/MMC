import React, { useEffect } from "react";
import QuestionCard from "../component/QuestionCard";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
import { questionAction } from "../redux/actions/questionAction";
import { useDispatch, useSelector } from "react-redux";

const AllQuestion = () => {
  const questionList = useSelector((state) => state.question.questions);
  const dispatch = useDispatch();
  const getallQuestions = () => {
    dispatch(questionAction.getQuestions());
  };
  useEffect(() => getallQuestions(), []);
  const [isfindpython, setfindpython] = React.useState(true);
  const [isfindjava, setfindjava] = React.useState(true);
  const [isfindC, setfindC] = React.useState(true);
  const [algorithm, setalorithm] = React.useState(true);
  const [debugging, setdebugging] = React.useState(true);

  const findpython = (event) => {
    setfindpython(event.target.checked);
  };
  const findjava = (event) => {
    setfindjava(event.target.checked);
  };
  const findC = (event) => {
    setfindC(event.target.checked);
  };
  const findalgorithm = (event) => {
    setalorithm(event.target.checked);
  };
  const finddebugging = (event) => {
    setdebugging(event.target.checked);
  };

  return (
    <div>
      <Container sx={{ mt: 5, alignItems: "center" }}>
        <Container>
          <Box className="searchbar">
            <Grid
              direction="row"
              container
              spacing={2}
              maxWidth="lg"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography color="text.secondary">키워드 검색</Typography>
              </Grid>
              <Grid item xs={8} textAlign="left">
                <TextField
                  className="searchbar"
                  required
                  fullWidth
                  id="usersearch"
                  label="키워드 검색"
                  name="userid"
                  autoFocus
                />
                <Grid item xs={1}>
                  <SearchIcon />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <Box className="searchbox" sx={{ mt: 3, alignItems: "center" }}>
          <Box sx={{}}></Box>
          상세설정
          <Box sx={{}}>
            주언어
            <Checkbox
              checked={isfindpython}
              onChange={findpython}
              inputProps={{ "aria-label": "controlled" }}
            />
            python
            <Checkbox
              checked={isfindjava}
              onChange={findjava}
              inputProps={{ "aria-label": "controlled" }}
            />
            java
            <Checkbox
              checked={isfindC}
              onChange={findC}
              inputProps={{ "aria-label": "controlled" }}
            />
            c++
          </Box>
          <Box sx={{}}>
            문제유형
            <Checkbox
              checked={algorithm}
              onChange={findalgorithm}
              inputProps={{ "aria-label": "controlled" }}
            />
            알고리즘
            <Checkbox
              checked={debugging}
              onChange={finddebugging}
              inputProps={{ "aria-label": "controlled" }}
            />
            디버깅
          </Box>
        </Box>
        <Link
          variant="button"
          color="text.primary"
          href="/question/write"
          sx={{ my: 1, mx: 1.5 }}
        >
          <Typography align="right">질문하기</Typography>
        </Link>
      </Container>
      <Container>
        <Grid container spacing={1}>
          {questionList.map((question) => (
            <Grid item  xl={3} lg={4} md={6} key={question}>
              <QuestionCard question={question}/>
              <br />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AllQuestion;
