import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#c1abff",
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
}));
const Word = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
}));
const TeacherCard = () => {
  return (
    <Item sx={{ backgroundColor: "#f6edff" ,minWidth:300 }}>
      <Word container direction="row" justifyContent="center" alignItems="center" >
        <Word item xs={4}>
            프로필 이미지
        </Word>
        <Word item xs={8}>
            닉네임
        </Word>
      </Word>

      <Stack direction="row" justifyContent="center" alignItems="center" sx={{minWidth:200 }}>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>주언어</Word>
          <Item>파이썬</Item>
        </Word>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>온도</Word>
          <Item>48</Item>
        </Word>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>백준티어</Word>
          <Item>브론즈3</Item>
        </Word>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>학력</Word>
          <Item>-</Item>
        </Word>
      </Stack>
      <Box>수상 및 경력
        <Item sx={{minHeight:50 }}>

        </Item>
      </Box>
    </Item>
  );
};

export default TeacherCard;
