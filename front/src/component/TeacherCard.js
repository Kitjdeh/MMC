import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

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
  const trainer = useSelector((state) => state.userinfo.userinfo);
  return (
    <Item sx={{ backgroundColor: "#f6edff" ,minWidth:300 }}>
      <Word container direction="row" justifyContent="center" alignItems="center" >
        <Word item xs={4}>
            <img src={trainer.profileImage} width="100%" component="form" noValidate xs sx={{ mt: 1, alignItems: "center" }}/>
        </Word>
        <Word item xs={8}>
            {trainer.nickname}
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
          <Item>{trainer.language}</Item>
        </Word>
        <Word
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Word>온도</Word>
          <Item>{trainer.temperature}</Item>
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
          <Item>{trainer.academicAbility}</Item>
        </Word>
      </Stack>
      <Box>수상 및 경력
        <Item sx={{minHeight:50 }}>
          {trainer.award}
        </Item>
      </Box>
    </Item>
  );
};

export default TeacherCard;
