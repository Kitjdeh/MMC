import axios from "axios";
import { apiInstance } from "../../api";
const api = apiInstance();

let baseUrl = "http://i8a508.p.ssafy.io:8083/api/v1/questions";

function getQuestions() {
  return async (dispatch, getState) => {
    let url = baseUrl;
    let response = await axios
      .get(url)
      .then((response) => {
        let data = response.data.questions;
        dispatch({ type: "GET_QUESTION_LIST_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("GetQuestions", error);
      });
  };
}

function getQuestionDetail(user_id) {
  return async (dispatch, getState) => {
    let url = baseUrl + `/${user_id}`;
    let response = await api
      .get(url)
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
  console.log("quset", question);
  return async () => {
    let url = baseUrl;
    let response = await api
      .post(url, JSON.stringify(question), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function deleteQuestion(question_id) {
  console.log("deleteQuestion", question_id);
  return async (dispatch) => {
    let url = baseUrl + `/${question_id}`;
    let response = await api
      .delete(url)
      .then((response) => {
        let data = response.data;
        console.log(data);
        dispatch({ type: "DEL_QUESTION_DETAIL_SUCCESS" });
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function getTrainers(question_id) {
  return async (dispatch) => {
    let url = baseUrl + `/${question_id}/trainer`;
    api.defaults.headers["jwt-auth-token"] =
      sessionStorage.getItem("jwt-auth-token");
    let response = await api
      .get(url)
      .then((response) => {
        let data = response.data.users;
        dispatch({ type: "GET_TRAINER_LIST_SUCCEESS", payload: { data } });
      })
      .catch((error) => {
        console.log("ERROR222", error);
      });
  };
}

function addTrainer(question_id, user_id) {
  console.log("addTrainer", question_id, user_id);
  const inputs = {
    questionId: question_id,
    userId: user_id,
  };
  return async () => {
    let url = baseUrl + `/lecture`;
    let response = await api
      .post(url, JSON.stringify(inputs), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function acceptTrainer(question_id, user_id) {
  console.log("acceptTrainer", question_id, user_id);
  const inputs = {
    questionId: question_id,
    userId: user_id,
    isAdopt: 1,
  };
  return async () => {
    let url = baseUrl + `/lecture/${question_id}/${user_id}`;
    let response = await api
      .patch(url, JSON.stringify(inputs), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function deleteTrainer(question_id, user_id) {
  console.log("deleteTrainer", question_id, user_id);
  return async () => {
    let url = baseUrl + `/lecture/${question_id}/${user_id}`;
    let response = await api
      .delete(url)
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function getQuestionImage(question_id) {
  console.log("getQuestionImage", question_id);
  return async (dispatch) => {
    let url = baseUrl + `/${question_id}/image`;
    let response = await api
      .get(url)
      .then((response) => {
        let data = response.data;
        console.log(data);
        dispatch({ type: "GET_IMAGE_URL_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}
function getBackJoon(user_backjoon) {
  console.log(user_backjoon);
  return async (dispatch) => {
    let url = `https://solved.ac/api/v3/user/show?handle=${user_backjoon}`;
    let response = await api
      .get(url)
      .then((response) => {
        let data = response.data;
        console.log(data);
        dispatch({ type: "GET_BACKJOON_INFO_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}
function modifyQuestion(question) {
  console.log("quset", question);
  let question_id = question["questionId"];
  return async () => {
    let url = baseUrl + `/${question_id}`;
    let response = await api
      .patch(url, JSON.stringify(question), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        console.log("질문수정들어감");
        let data = response.data;
      })
      .catch((error) => {
        console.log("ERROR질문수정", error);
      });
  };
}
function userCount() {
  return async (dispatch, getState) => {
    let url = "http://i8a508.p.ssafy.io:8083/api/v1/users/count";
    console.log("count");
    let response = await axios
      .get(url)
      .then((response) => {

        let data = response.data.users;
        dispatch({ type: "GET_USER_COUNT_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("GetQuestions", error);
      });
  };
}
export const questionAction = {
  getQuestions,
  getQuestionDetail,
  writeQuestion,
  deleteQuestion,
  getTrainers,
  addTrainer,
  acceptTrainer,
  deleteTrainer,
  getQuestionImage,
  getBackJoon,
  userCount,
  modifyQuestion
};
