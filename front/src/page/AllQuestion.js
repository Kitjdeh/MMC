import React, { useEffect, useState } from "react";
import QuestionCard from "../component/QuestionCard";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { questionAction } from "../redux/actions/questionAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { styled as styledM } from "@mui/material/styles";

import styled from "styled-components";

const TypographyOtf = styledM(Typography)({
  fontFamily: "BMHANNAProOTF"
});
const TextFieldM = styledM(TextField)(() => ({
  border: `5px solid #DFD3C3`,
  marginBottom: 20
}));

const BoxTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgba(0,0,0,0.7);
`;

const AllQuestion = () => {
  const [filteredList, setFilteredList] = React.useState([])
  const [check, setCheck] = useState(
    {
      python: true,
      java: true,
      c: true,
      search: "",
      debug: true,
      algo: true,
    }
  )
  const languagenum = [

    'python',
    'java',
    'c'
  ]
  const categorynum = [
    'algo', 'debug'
  ]
  console.log(check, "체크체크체크")
  console.log()
  const questionList = useSelector((state) => state.question.questions);

  const dispatch = useDispatch();
  const getallQuestions = () => {
    dispatch(questionAction.getQuestions());
  };
  useEffect(() => getallQuestions(), []);
  useEffect(()=> {
    let filteredList = []
    questionList.forEach((item, index) => {
      if (item.progress!=2) { filteredList.push(item) }
    })
    setFilteredList(filteredList);
  }
  ,[questionList])
  console.log(filteredList, "초기값")
  console.log(questionList, "????")
  const getfilter = () => {
    let language = []
    let category = []
    let search = check.search
    let filteredList = []
    languagenum.forEach((item, index) => {
      if (check[item] === true) {
        language.push(index)
      }
    })
    categorynum.forEach((item, index) => {
      if (check[item] === true) {
        category.push(index)
      }
    })
    questionList.forEach((item, index) => {
      if (item["title"].includes(search) && language.includes(item["language"])
        && category.includes(item["category"]) && item.progress != 2) { filteredList.push(item) }
    })
    console.log("체크확인", search, language, category)
    console.log(filteredList)
    setFilteredList(filteredList)
  }
  useEffect(() => {
    getfilter()
  }, [check])

  const resetFilterList = () => {
    setCheck({ ...check, debug: true, algo: true, python: true, java: true, c: true, })
  };
  console.log("필터된거", filteredList)


  return (

    <div>
      <Container sx={{ mt: 5, alignItems: "center" }}>
        <Container>
          <Box className="searchbar">
            <Grid item xs={12} textAlign="left">
              <TextFieldM
                font
                required
                fullWidth
                id="usersearch"
                label="키워드 검색"
                name="userid"
                onChange={(event) => setCheck({ ...check, search: event.target.value })}
              />
            </Grid>
          </Box>
        </Container>
        <Box sx={{ padding: "0 0 0 8px", fontSize: 14, mt: 7, mb: 0.5, fontWeight: 700, color: "#917B56" }}>
          상세설정
        </Box>
        <Box
          sx={{ alignItems: "center", position: "relative", border: "4px solid #F0E4D4", padding: "10px 15px" }}
        >

          <Box sx={{ color: "#6C5D53", fontSize: 14 }}>
            주언어

            <Checkbox
              checked={check.python}
              onChange={(event) => setCheck({ ...check, python: event.target.checked })}
              inputProps={{ "aria-label": "controlled" }}
            />
            python
            <Checkbox
              checked={check.java}
              onChange={(event) => setCheck({ ...check, java: event.target.checked })}
              inputProps={{ "aria-label": "controlled" }}
            />
            java
            <Checkbox
              checked={check.c}
              onChange={(event) => setCheck({ ...check, c: event.target.checked })}
              inputProps={{ "aria-label": "controlled" }}
            />
            c++
          </Box>
          <Box sx={{ color: "#6C5D53", fontSize: 14 }}>
            문제유형

            <Checkbox
              checked={check.algo}
              onChange={(event) => setCheck({ ...check, algo: event.target.checked })}
              inputProps={{ "aria-label": "controlled" }}
            />
            알고리즘
            <Checkbox
              checked={check.debug}
              onChange={(event) => setCheck({ ...check, debug: event.target.checked })}
              inputProps={{ "aria-label": "controlled" }}
            />
            디버깅
          </Box>
          <Grid
            item
            xs={1}
            sx={{ position: "absolute", top: "40%", right: "5%" }}
          >
            <RotateLeftIcon onClick={() => resetFilterList()} />
          </Grid>
        </Box>
        <Link
          variant="button"
          color="text.primary"
          href="/question/write"
          underline="none"
        >
          <TypographyOtf sx={{ padding: "15px", color: "#917B56" }} align="right">질문하기</TypographyOtf>
        </Link>
      </Container>
      <Container>
        <Grid container direction="row" >
          {filteredList.slice(0).reverse()?.map((question) => (
            <Grid key={question.questionId} justifyContent="space-between">
              <Button>
                <QuestionCard question={question} />
              </Button>
              <br />
            </Grid>
          ))

          }
        </Grid>
      </Container>

    </div>
  );
};

export default AllQuestion;
