import axios from "axios";

function getQuestionDetail(id) {
  return async (dispatch, getState) => {
    let url = `http://i8a508.p.ssafy.io:8080/api/v1/questions/${id}`;
    let response = await axios.get(url)
      .then((response) => {
        console.log("리스폰성공", response);
        let data = response.data;
        let result = data.question;
        console.log("성공이전");
        console.log("성공", result);
        dispatch({ type: "GET_QUESTION_DETAIL_SUCCESS", payload: { result } });
      })
      .catch((error) => {
        console.log("ㅅㅂ", error);
      });
  };
}
export const detailquestionAction = { getQuestionDetail };
