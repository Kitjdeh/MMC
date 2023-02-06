import axios from "axios";

function teacherinfoAction(id) {
  return async (dispatch, getState) => {
    let url = `http://i8a508.p.ssafy.io:8080/api/v1/questions/${id}/trainer`;
    let response = await axios
      .get(url)
      .then((response) => {
        let data = response.data;
        let result = data.question;
        console.log("강사요청데이타",data)
        dispatch({ type: "GET_TEACHER_INFO_SUCCESS", payload: { result } });
      })
      .catch((error) => {});
  };
}

export const teacherinfoAction = { getQuestionDetail };
