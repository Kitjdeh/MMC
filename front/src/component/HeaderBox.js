import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TypographyOtf = styled(Typography)({
  fontFamily: "BMHANNAProOTF"
});

const HeaderBox = (props) => {
  return (
    <Box sx={{ mb: 2 }} >
      <TypographyOtf variant="h4" >{props?.title}</TypographyOtf>
      <TypographyOtf variant="subtitle2" >
        {props?.number}
      </TypographyOtf>
    </Box>
  );
};

export default HeaderBox;
