import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ButtonBase from "@mui/material/ButtonBase";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const MainBodyBox = (props) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 700,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Img alt="img" src={props?.img} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={6} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs container alignItems="center">
              <Typography  variant="h7" >
               {props?.title}
              </Typography>

              <Typography variant="body2">{props?.mention}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MainBodyBox;
