import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector, useStore } from "react-redux";
import { questionAction } from "../redux/actions/questionAction";
import TeacherCard from "./TeacherCard";
import TeacherRegister from "./TeacherRegister";
import { TransitEnterexitSharp } from "@mui/icons-material";
import { adminAction } from "./../redux/actions/adminAction";
import { Button } from "@mui/material";
import { noteAction } from "./../redux/actions/noteAction";
import { Cookies } from "react-cookie";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#f6edff" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  minWidth: 50,
}));

const Bar = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#f6edff" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
}));

const lang = ["Python", "Java", "C++"];
const category = ["알고리즘", "디버깅"];
const algo = [
  "BFS",
  "DFS",
  "그래프",
  "DP",
  "정렬",
  "그리디",
  "시뮬레이션",
  "분할정복",
  "순열",
  "조합",
  "부분집합",
  "최소스패닝트리",
  "기타",
];
const source = ["백준", "프로그래머스"];

const QuestionMain = ({ question }) => {
  const [algorithm, setAlgorithm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adoptuser, setAdoptuser] = useState("");
  const [selected, setSelected] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trainers = useSelector((state)=>state.question.trainers);
  const noteId = useSelector((state) => state.note.note);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  let time = new Date(question.reservation);
  useEffect(() => {
    if (question.progress) {
      setAdoptuser(question.progress);
    }
    transBitmask();
  }, []);
  useEffect(() => {
    if (loading) {
      console.log("NOTEID", noteId);
      navigate(`/lecture/${noteId}`);
    }
  }, [noteId]);


  const transBitmask = () => {
    let algobit = 1;
    let index = 0;
    let updated = [];
    for (let x of question.algorithm.toString(2).split("").reverse().join("")) {
      algobit = algobit && x;
      if (algobit === "1") {
        updated=updated.concat(algo[index++]);
      }
    }
    setAlgorithm(updated);
  };
  const deleteQuestion = () => {
    dispatch(questionAction.deleteQuestion(question.questionId));
  };
  const addTrainer = () => {
    dispatch(questionAction.addTrainer(question.questionId, userId)); //userId 추가 필요
  };
  const select = (num) => {
    setSelected(num);
  }

  const getLectureNote = async () => {
    console.log("QUESTIONID", question.questionId);
    dispatch(noteAction.getLectureNote(question.questionId));
    setLoading(true);
  };
  const note = useSelector((state) => state.note.note);
  const selectTrainer = (item) => {
    const { name } = item;
    console.log({ name }, name);
    console.log("클릭클릭", item.target, name);
  };
  return (
    <Box sx={{ minWidth: 100 }}>
      <Bar sx={{ backgroundColor: "#f6edff" }}>
        <Bar
          container
          spacing={1}
          sx={{ minWidth: 100, backgroundColor: "#f6edff" }}
        >
          <Grid item xs={3}>
            <Item sx={{ backgroundColor: "#f6edff" }}>제목</Item>
          </Grid>

          <Grid item xs={9}>
            <Item>{question.title}</Item>
          </Grid>
        </Bar>
      </Bar>
      <br />
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Item>언어</Item>
        <Item>카테고리</Item>
        <Item>출처</Item>
        <Item>문제번호</Item>
        <Item>포인트</Item>
        <Item>예약시간</Item>
      </Stack>

      <hr />

      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Item>{lang[question.language]}</Item>
        <Item>{category[question.category]}</Item>
        <Item>{source[question.source]}</Item>
        <Item>{question.questionNumber}</Item>
        <Item>{question.point}</Item>
        <Item>
          {new Date(question.reservation).toLocaleString("ko-kr", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </Item>
      </Stack>
      <br />
      <Bar height={50} sx={{ minWidth: 300, backgroundColor: "#f6edff" }}>
        <Grid container sx={{}}>
          <Bar item xs={2} margin={1}>
            알고리즘
          </Bar>

          {algorithm.map((element) => (
            <Bar item xs={2} margin={1}>
              {element}
            </Bar>
          ))}
        </Grid>
      </Bar>
      <br />
      <Bar sx={{ minWidth: 400, backgroundColor: "#f6edff" }}>
        {question.content}
      </Bar>
      <Box>
        <Bar>
          {question?.userId !== parseInt(userId) && question?.progress < 1 ? (
            <Button onClick={addTrainer}>문제풀이 신청</Button>
          ) : (
            <Box></Box>
          )}
        </Bar>
        {question.progress === 0 ? (
          <Container>
            <Grid container justifyContent="space-between">
              <Grid item margin={1} xs={5}>
                <Item sx={{ minWidth: 100, backgroundColor: "#f6edff" }}>
                  답변자 리스트
                </Item>
                <Item>
                  <TeacherRegister
                    nickname="프로필"
                    temperature="온도"
                    cancelregister="신청취소"
                    select="선택하기"
                  />
                  {trainers.length != 0 ? (
                    trainers.map((item) => (
                      // <Button name={item} onClick={selectTrainer(item)}>
                      <TeacherRegister
                        nickname={item.nickname}
                        temperature={item.temperature}
                        writeId={item.userId}
                        select={select}
                      />
                      // </Button>
                    ))
                  ) : (
                    <Item>답변자 리스트가 없습니다.</Item>
                  )}
                </Item>
              </Grid>

              <Grid item margin={1} xs={5}>
                {selected !== -1 ? (
                  <TeacherCard />
                ) : (
                  <div>
                    강사 정보가 없습니다. <br></br>강사 프로필을 눌러주세요.
                  </div>
                )}
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Bar>채택이 완료된 질문입니다!</Bar>
        )}
      </Box>
      {userId == question?.userId ? (
        <button onClick={deleteQuestion}>글 삭제</button>
      ) : (
        <Box></Box>
      )}

        {question.progress ===0 ? <Box></Box> :
      (adoptuser == userId || question?.userId == userId)? (
        <Bar>
          <Button onClick={getLectureNote}>강의실 입장</Button>
        </Bar>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};
export default QuestionMain;
