import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { questionAction } from './../redux/actions/questionAction';
import { styled } from "@mui/material/styles";

const TypographyOtf = styled(Typography)({
  fontFamily: "BMHANNAProOTF"
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FEFBE2",
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
  maxWidth: 400,
}));

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showDetail = () => {
    navigate(`/question/${question.questionId}`);
  };
  return (
    <Item
      sx={{
        p: 2,
        margin: "50",
        width: 250,
        height: 250
      }}
      onClick={showDetail}
    >
      <Box component="form" noValidate sx={{ color: "#6C5D53", mt: 1, alignItems: "center" }}>
        테마
      </Box>

      <Box sx={{ color: "#6C5D53"}}>
        <TypographyOtf sx={{ color: "#6C5D53"}} variant="h6" align="right">
          {question.title}
        </TypographyOtf>
      </Box>
      <Box>
        <Grid sx={{ color: "#6C5D53"}} container spacing={1}>
          <Grid item xs={8} textAlign="left"></Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container alignItems="center">
                <TypographyOtf variant="h8" align="right">
                  {new Date(question.reservation).toLocaleString("ko-kr", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </TypographyOtf>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8} textAlign="left">
            {question.userId}
          </Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container alignItems="center">
                <TypographyOtf sx={{ color: "#6C5D53"}} variant="body1">{question.point}point</TypographyOtf>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Item>
  );
};

export default QuestionCard;
