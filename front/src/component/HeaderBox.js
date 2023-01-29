import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const HeaderBox = (props) => {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
      }}
    >
      icon
      <Typography variant="h5">{props?.title}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {props?.number}
      </Typography>
    </Card>
  );
};

export default HeaderBox;
