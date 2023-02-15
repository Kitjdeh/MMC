import React, { useEffect, useState } from "react";
import QuestionCard from "../component/QuestionCard";
import Spinner from "../icon/Spinner"
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
import { questionAction } from "../redux/actions/questionAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { styled as styledM } from "@mui/material/styles";
import styled from "styled-components";

const TextFieldM = styledM(TextField)(() => ({
  border: `5px solid rgba(69, 64, 225, 0.2)`,
  marginBottom: 20,
}));

const BoxTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgba(0,0,0,0.7);
`;

const AllQuestion = () => {
  const [searchList, setSearch] = useState("");
  const [isfindpython, setfindpython] = React.useState(true);
  const [isfindjava, setfindjava] = React.useState(true);
  const [isfindC, setfindC] = React.useState(true);
  const [algorithm, setalorithm] = React.useState(true);
  const [debugging, setdebugging] = React.useState(true);
  const [filteredList, setFilteredList] = React.useState([]);
  const [language, setLanguage] = React.useState([]);
  const [category, setCategory] = useState([]);
  // const [is_loaded,setLoaded] = useState(false)
  const languageGroup = [isfindpython, isfindjava, isfindC];
  const categoryGroup = [algorithm, debugging];
  const questionList = useSelector((state) => state.question.questions);
 
  const is_loaded = useSelector((state) => state.question.is_loaded);
 
 
  console.log(is_loaded,"is_loaded");
  const dispatch = useDispatch();
  const getallQuestions = () => {
    dispatch(questionAction.getQuestions());
  };
  useEffect(() => getallQuestions(), []);
  useEffect(() => {
    getFilteredList();
  }, [searchList]);

  useEffect(() => {
    const getLanguage = () => {
      let temp = [];
      languageGroup.forEach((item, index) => {
        if (item === true) {
          temp.push(index);
        }
      });
      setLanguage(temp);
      console.log("언어세팅", language);
      return language;
    };
    const getFilteredList = () => {
      // 1. 3가지 언어 중 체크 여부 확인
      let setLanguage = getLanguage();
      // 2. 받아온걸로 filter
      let result = questionList.filter(
        (item) =>
          item["title"].includes(searchList) &&
          setLanguage.includes(item["language"])
      );
      setFilteredList(result);
      console.log("필터적용", filteredList);
      return;
    };
    getFilteredList();
  }, [isfindpython, isfindjava]);

  useEffect(() => {
    const getCategory = () => {
      let temp = [];
      categoryGroup.forEach((item, index) => {
        if (item === true) {
          temp.push(index);
        }
      });
      setCategory(temp);
    };
  }, [algorithm, debugging]);
  //함수 selectList 구성 effect({},[language,search,category])
  //1. 검색어 title 모으는 titleList
  //2. 언어 체크리스트 모으는 lanugageGroup
  //3. 유형 체크리스트 모으는 categoryGroup
  //4. 3가지 함수를 await로 대기 한 후 filter
  // const getLanguage = () => {
  //   let temp = [];
  //   languageGroup.forEach((item, index) => {
  //     if (item === true) {
  //       temp.push(index);
  //     }
  //   });
  //   setLanguage(temp);
  //   return language;
  // };

  const getFilteredList = async (event) => {
    // 1. 3가지 언어 중 체크 여부 확인
    // let setLanguage = await getLanguage();
    // 2. 검색창 입력갑 받음
    let setTitle = await searchList;
    // 3. 받아온걸로 filter
    let result = await questionList.filter(
      (item) =>
        item["title"].includes(searchList) &&
        setLanguage.includes(item["language"]) &&
        setCategory.includes(item["category"])
    );
    setFilteredList(result);
    return;
  };
  const resetFilterList = () => {
    setfindpython(true);
    setfindjava(true);
    setfindC(true);
    setalorithm(true);
    setdebugging(true);
  };
  // console.log("필터", result);
  // const findpython = (event) => {
  //   setfindpython(event.target.checked);
  // };
  // const findjava = (event) => {
  //   setfindjava(event.target.checked);
  // };
  // const findC = (event) => {
  //   setfindC(event.target.checked);
  // };
  const findalgorithm = (event) => {
    setalorithm(event.target.checked);
  };
  const finddebugging = (event) => {
    setdebugging(event.target.checked);
  };

  return (

    <div>
      <Container sx={{ mt: 5, alignItems: "center" }}>
        <Container>
          <Box className="searchbar">
          <Grid item xs={12} textAlign="left">
                <TextFieldM
                  // variant="standard"
                  required
                  fullWidth
                  id="usersearch"
                  label="키워드 검색"
                  name="userid"
                  onChange={(event) => setSearch(event.target.value)}
                  // InputProps={{disableUnderline:true}}
                />
            </Grid>
          </Box>
        </Container>
        <Box sx={{ padding:"0 0 0 8px", fontSize: 14, mt:7, mb:0.5, fontWeight:700, color: "#917B56" }}>
            상세설정
          </Box>
        <Box
          sx={{  alignItems: "center", position: "relative",   border: "3px solid rgba(69, 64, 225, 0.2)", padding:"10px 15px"}}
        >
          <Box sx={{ fontSize: 14 }}>
            <BoxTitle>주언어</BoxTitle>
            <Checkbox
              checked={isfindpython}
              onChange={(event) => setfindpython(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
            python
            <Checkbox
              checked={isfindjava}
              onChange={(event) => setfindjava(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
            java
            <Checkbox
              checked={isfindC}
              onChange={(event) => setfindC(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
            c++
          </Box>
          <Box sx={{fontSize:14}}>
            <BoxTitle>문제유형</BoxTitle>
            <Checkbox
              checked={algorithm}
              onChange={findalgorithm}
              inputProps={{ "aria-label": "controlled" }}
            />
            알고리즘
            <Checkbox
              checked={debugging}
              onChange={finddebugging}
              inputProps={{ "aria-label": "controlled" }}
            />
            디버깅
          </Box>
          <Grid
            item
            xs={1}
            sx={{ position: "absolute", top: "40%", right: "5%" }}
          >
            <SearchIcon onClick={() => getFilteredList()} sx={{ mr: "20px" }} />
            <RotateLeftIcon onClick={() => resetFilterList()} />
          </Grid>
        </Box>
        <Link
          variant="button"
          color="text.primary"
          href="/question/write"
          sx={{ my: 1, mx: 1.5 }}
        >
          <Typography align="right">질문하기</Typography>
        </Link>
      </Container>
      <Container>
        <Grid container spacing={1}>
          {searchList?.length < 1 && language?.length === 3
            ? questionList.map((question) => (
                <Grid item xl={3} lg={4} md={6} key={question.questionId}>
                  <Button>
                    <QuestionCard question={question} />
                  </Button>
                  <br />
                </Grid>
              ))
            : filteredList.slice(0).reverse()?.map((question) => (
                <Grid item xl={3} lg={4} md={6} key={question.questionId}>
                  <Button>
                    <QuestionCard question={question} />
                  </Button>
                  <br />
                </Grid>
              ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AllQuestion;
