import axios from "axios";
let baseURL=`http://i8a508.p.ssafy.io:8083/api/v1`;

function sendDepositAndWithdrawl(trade) {
  return async (dispatch) => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseURL+`/mypage/points`;
    let response = await axios.post(url, JSON.stringify(trade), {headers: {
        "Content-Type": "application/json;charset=utf-8"}})
      .then((response) => {
        let data = response.data;
        // dispatch({ type: "GET_POINT_DETAIL_SUCCESS", payload: { result } });
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function getDepositAndWithdrawList(user_id){
    return async (dispatch)=>{
        let url = baseURL+`/mypage/points/${user_id}`;
        let response = await axios.get(url)
        .then((response)=>{
            let data=response.data;
            dispatch({type:"GET_POINT_LIST_SUCCESS", payload:{data}});
        })
        .catch((error)=>{
            console.log("fail",error);
        })
    }
}

function getMyQuestionList(user_id){
  return async (dispatch) => {
    let url = baseURL + `/mypage/questions/${user_id}`;
    let response = await axios.get(url)
    .then((response)=>{
      let data=response.data.questions;
      dispatch({type:"GET_MYQUESTION_LIST_SUCCESS",payload:{data}});
    })
    .catch((error)=>{
      console.log("getMyQuestionList Fail",error);
    })
  }; 
}

function getMyLectureList(user_id){
  return async (dispatch) => {
    let url = baseURL + `/mypage/answers/${user_id}`;
    let response = await axios.get(url)
    .then((response)=>{
      let data=response.data.questions;
      dispatch({type:"GET_MYLECTURE_LIST_SUCCESS",payload:{data}});
    })
    .catch((error)=>{
      console.log("getMyLecturesList Fail",error);
    })
  }; 
}

export const mypageAction = { sendDepositAndWithdrawl, getDepositAndWithdrawList, getMyQuestionList, getMyLectureList};