import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Opacity } from "@mui/icons-material";




const HeaderBox = (props) => {
  return (
    <Box sx={{textAlign:"center"}} >
      icon
      <Typography variant="h6" >{props?.title}</Typography>
      <Typography variant="subtitle2" >
        {props?.number}
      </Typography>
    </Box>
  );
};

export default HeaderBox;
