import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
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
};

const QuestionCard = () => {
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/question/${question.question_id}`);
  };
  return (
    <Paper
      sx={{
        p: 2,
        margin: "50",
        maxWidth: 400,
      }}
      onClick={showDetail}
    >
      <Box component="form" noValidate sx={{ mt: 1, alignItems: "center" }}>
        테마
      </Box>

      <Box>
        <Typography variant="h6" align="right">
          {question.title}
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={8} textAlign="left">
          </Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container alignItems="center">
                <Typography variant="h8" align="right">
                  {question.reservation}
                </Typography>

              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8} textAlign="left">
            {question.uerid}

          </Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container alignItems="center">
                <Typography variant="body1">{question.point}point</Typography>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default QuestionCard;
