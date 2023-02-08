import axios from "axios";

let baseUrl="http://i8a508.p.ssafy.io:8083/api/v1/questions";

function getQuestions(){
    return async (dispatch,getState)=>{
        let url = baseUrl;
        let response = await axios.get(url)
        .then((response)=>{
            let data=response.data.questions;
            dispatch({type:"GET_QUESTION_LIST_SUCCESS",payload:{data}});
        })
        .catch((error)=>{
            console.log("GetQuestions", error);
        })
    }   
}

function getQuestionDetail(user_id) {
  return async (dispatch, getState) => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/questions/${user_id}`;
    let url = baseUrl+`/${user_id}`;
    let response = await axios.get(url)
      .then((response) => {
        let data = response.data.question;
        dispatch({ type: "GET_QUESTION_DETAIL_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("fail", error);
      });
  };
}

function writeQuestion(question) {
  console.log("quset",question);
  return async () => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseUrl;
    let response = await axios.post(url, JSON.stringify(question), {headers: {
        "Content-Type": "application/json;charset=utf-8"}})
      .then((response) => {
        let data = response.data;
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function deleteQuestion(question_id){
  console.log("deleteQuestion",question_id);
  return async (dispatch) => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseUrl+`/${question_id}`;
    let response = await axios.delete(url)
      .then((response) => {
        let data = response.data;
        console.log(data);
        dispatch({type:"DEL_QUESTION_DETAIL_SUCCESS"});
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function getTrainers(question_id){
  console.log("getTrainers",question_id);
  return async (dispatch) => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseUrl+`/${question_id}/trainer`;
    let response = await axios.get(url)
      .then((response) => {
        let data = response.data;
        console.log(data);
        dispatch({type: "GET_TRAINER_LIST_SUCCEESS", payload :{data}})
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function addTrainer(question_id, user_id){
  console.log("addTrainer",question_id, user_id);
  const inputs = {
    questionId:question_id,
    userId:user_id
  }
  return async () => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseUrl+`/lecture`;
    let response = await axios.post(url, JSON.stringify(inputs), {headers: {
      "Content-Type": "application/json;charset=utf-8"}})
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function acceptTrainer(question_id, user_id){
  console.log("acceptTrainer", question_id, user_id);
  const inputs = {
    questionId:question_id,
    userId:user_id,
    isAdopt:1
  }
  return async () => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseUrl+`/lecture/${question_id}/${user_id}`;
    let response = await axios.patch(url, JSON.stringify(inputs), {headers: {
      "Content-Type": "application/json;charset=utf-8"}})
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function deleteTrainer(question_id,user_id){
  console.log("deleteTrainer",question_id, user_id);
  return async () => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseUrl+`/lecture/${question_id}/${user_id}`;
    let response = await axios.delete(url)
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function getQuestionImage(question_id){
  console.log("getQuestionImage",question_id);
  return async (dispatch) => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseUrl+`/${question_id}/image`;
    let response = await axios.get(url)
      .then((response) => {
        let data = response.data;
        console.log(data);
        dispatch({type:"GET_IMAGE_URL_SUCCESS", payload: {data}});
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

export const questionAction = {getQuestions, getQuestionDetail, writeQuestion, deleteQuestion, getTrainers, addTrainer, acceptTrainer, deleteTrainer ,getQuestionImage}