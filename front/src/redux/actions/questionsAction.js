import axios from "axios";

function getQuestions(id) {
  return async (dispatch, getState) => {
    let url = `http://i8a508.p.ssafy.io:8080/api/v1/questions`;
    let response = await axios.get(url)
      .then((response) => {
        let data = response.data;
        let result = data.questions;
        console.log(response)
        dispatch({ type: "GET_QUESTIONS_SUCCESS", payload: { result } });
      })
      .catch((error) => {
      });
  };
}
export const questionAction = { getQuestions };
