import axios from "axios";


let baseUrl='http://i8a508.p.ssafy.io:8083/api/v1';
function getQuestionDetail(id) {
  return async (dispatch, getState) => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/questions/${id}`;
    let url = `${baseUrl}/questions/${id}`;
    let response = await axios.get(url)
      .then((response) => {
        let data = response.data;
        let result = data.question;
        dispatch({ type: "GET_QUESTION_DETAIL_SUCCESS", payload: { result } });
      })
      .catch((error) => {
      });
  };
}







export const detailquestionAction = { getQuestionDetail };
