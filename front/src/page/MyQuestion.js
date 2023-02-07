import React,{useEffect} from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import QuestionCard from './../component/QuestionCard';
import { useDispatch } from 'react-redux';
import { mypageAction } from "../redux/actions/mypageAction";
import { useSelector } from 'react-redux';

const MyQuestion = () => {
  useEffect(() => {
    getMyQuestion();
  }, [])
  const dispatch = useDispatch();
  const getMyQuestion = () =>{
    dispatch(mypageAction.getMyQuestionList(1));  //userId로 바꿔야됨
  }
  const questionList = useSelector((state) => state.mypage.questions);
  console.log("questions", questionList);

  return (
    // <div>
    //   <button onClick={getMyQuestion}>click</button>
    // </div>
    (questionList.length > 0 ?
    <Container>
    <Grid container spacing={1}>
      {questionList.map((question) => (
        <Grid item  xl={3} lg={4} md={6}>
          <QuestionCard question={question}/>
          <br />
        </Grid>
      ))}
    </Grid>
  </Container>:<div>내 질문이 없습니다.</div>
    )
  )
}

export default MyQuestion