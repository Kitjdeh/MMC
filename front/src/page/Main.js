import React from "react";
import HeaderBox from "../component/HeaderBox";
import MainBodyBox from "../component/MainBodyBox";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { mainInfo } from "../redux/reducers/question";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
const Item = styled(Container)(({ theme }) => ({
  backgroundColor: "#f6edff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const mainbodylist = [
  {
    title: "Real-Time Collaboration",
    mention: "코딩하면서 생긴 궁금증을 해결하고 싶어요",
    img: "/img/main1.png",
  },
  {
    title: "Check Your Error",
    mention:
      "왜 틀린건지,무엇을 잘못한건지, 다른 방법이 궁금한지, 찾지말고 물어보세요",
    img: "/img/main2.png",
  },
  {
    title: "Make Your Answer",
    mention:
      "Make Your Answer,1:1로 해설을 듣고,1:1로 필기를 받고,1:1로 정답을 만들어서,당신만의 정답을 만드세요",
    img: "/img/main3.png",
  },
];

const Main = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f6edff" }}>
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={4}>
        <Item >
          <HeaderBox icon="faUser" title="전체회원" number="3435" />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <HeaderBox
            icon="faGraduationCap"
            title="진행중인질문"
            number="213"
          />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <HeaderBox icon="ff" title="완료된질문" number="434512" />
        </Item>
      </Grid>
      <Grid item xs={12} sx={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
        <Item sx={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
          {" "}
          {mainbodylist.map((item) => (
            <MainBodyBox
              title={item.title}
              mention={item.mention}
              img={item.img}
            />
          ))}
        </Item>
      </Grid>
    </Grid>
  </Box>
);
};

export default Main;
