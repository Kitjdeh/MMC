import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";




const HeaderBox = (props) => {
  return (
    <Box sx={{ mb: 2 }} >
      icon
      <Typography variant="h4" >{props?.title}</Typography>
      <Typography variant="subtitle2" >
        {props?.number}
      </Typography>
    </Box>
  );
};

export default HeaderBox;
