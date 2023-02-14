import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/question/${question.questionId}`);
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
          <Grid item xs={8} textAlign="left"></Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container alignItems="center">
                <Typography variant="h8" align="right">
                  {new Date(question.reservation).toLocaleString("ko-kr", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8} textAlign="left">
            {question.userId}
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
