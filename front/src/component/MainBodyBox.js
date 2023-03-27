import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const TypographyOtf = styled(Typography)({
  fontFamily: "BMHANNAProOTF"
});

const MainBodyBox = (props) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        mb: 5,
        maxWidth: 1000,
        border: "1px solid #917B56",
        backgroundColor: "#F0E4D4",
        zIndex: "1"
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Img alt="img" src={props?.img} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={6} sm container>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={2}
            justifyContent="center"
          >
            <Grid item xs={1} alignItems="center">
              <TypographyOtf variant="h5" align="center">
                {props?.title}
              </TypographyOtf>
            </Grid>
            <Grid item xs={5}>
              <TypographyOtf variant="body1">{props?.mention}</TypographyOtf>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MainBodyBox;
