import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

const TypographyOtf = styled(Typography)({
  fontFamily: "BMHANNAProOTF",
});

//채택
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F0E4D4",
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
  maxWidth: 400,
}));

//진행중
const NotSelectedItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FEFBE2",
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
  maxWidth: 400,
}));

//완료
const DoneItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#D1BBA0",
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
  maxWidth: 400,
}));
const QuestionCard = ({ question }) => {
  console.log(question, "111111111111");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showDetail = () => {
    navigate(`/question/${question.questionId}`);
  };
  return (
    <div>
      {question?.progress == 0 ? (
        <NotSelectedItem
          sx={{
            p: 2,
            margin: "50",
            width: 250,
            height: 250,
          }}
          onClick={showDetail}
        >
          <Box
            component="form"
            noValidate
            sx={{ color: "#6C5D53", mt: 1, alignItems: "center" }}
          >
          </Box>

          <Box sx={{ color: "#6C5D53", mr:2 }}>
            <TypographyOtf sx={{ color: "#6C5D53" }} variant="h6" align="right">
              {question.title}
            </TypographyOtf>
          </Box>
          <Box>
            <Grid sx={{ color: "#6C5D53" }} container spacing={1}>
              <Grid item xs={8} textAlign="left"></Grid>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs container alignItems="center">
                    <TypographyOtf variant="h8" mb="80px" align="right">
                      {new Date(question.reservation).toLocaleString("ko-kr", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </TypographyOtf>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs container alignItems="center">
                    <TypographyOtf sx={{ color: "#6C5D53" }} variant="body1">
                      {question.point}point
                    </TypographyOtf>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </NotSelectedItem>
      ) : question?.progress == 2 ? (
        <DoneItem
          sx={{
            p: 2,
            margin: "50",
            width: 250,
            height: 250,
          }}
          onClick={showDetail}
        >
          <Box
            component="form"
            noValidate
            sx={{ color: "#6C5D53", mt: 1, alignItems: "center" }}
          >
          </Box>

          <Box sx={{ color: "#6C5D53", mr:2  }}>
            <TypographyOtf sx={{ color: "#6C5D53" }} variant="h6" align="right">
              {question.title}
            </TypographyOtf>
          </Box>
          <Box>
            <Grid sx={{ color: "#6C5D53" }} container spacing={1}>
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

              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs container alignItems="center">
                    <TypographyOtf sx={{ color: "#6C5D53" }} variant="body1">
                      {question.point}point
                    </TypographyOtf>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DoneItem>
      ) : (
        <Item
          sx={{
            p: 2,
            margin: "50",
            width: 250,
            height: 250,
          }}
          onClick={showDetail}
        >
          <Box
            component="form"
            noValidate
            sx={{ color: "#6C5D53", mt: 1, alignItems: "center" }}
          >
          </Box>

          <Box sx={{ color: "#6C5D53", mr:2  }}>
            <TypographyOtf sx={{ color: "#6C5D53" }} variant="h6" align="right">
              {question.title}
            </TypographyOtf>
          </Box>
          <Box>
            <Grid sx={{ color: "#6C5D53" }} container spacing={1}>
              <Grid item xs={8} textAlign="left"></Grid>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs container alignItems="center">
                    <TypographyOtf variant="h8" align="right" mb="80px">
                      {new Date(question.reservation).toLocaleString("ko-kr", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </TypographyOtf>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs container alignItems="center">
                    <TypographyOtf sx={{ color: "#6C5D53" }} mb="80px" variant="body1">
                      {question.point}point
                    </TypographyOtf>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Item>
      )}
    </div>
  );
};
export default QuestionCard;
