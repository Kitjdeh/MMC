import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f6edff",
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
  maxWidth:400,
}));
const Word = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
}));


const TeacherRegister = ({nickname,temperature,userId}) => {
    
  return (
    <Word>
      <Stack
        direction="row"
        justifyContent="space-between"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Item sx={{maxWidth:50 }}>{nickname}</Item>
        <Item>{temperature}</Item>
        <Item>신청하기</Item>
      </Stack>
    </Word>
  );
};

export default TeacherRegister;
