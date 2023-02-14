// import axios from "axios";

// function getQuestionDetail(id) {
//   return async (dispatch, getState) => {
//     // let url = `http://i8a508.p.ssafy.io:8080/api/v1/questions/${id}`;
//     let url = `http://localhost:8080/api/v1/questions/${id}`;
//     let response = await axios.get(url)
//       .then((response) => {
//         let data = response.data;
//         let result = data.question;
//         dispatch({ type: "GET_QUESTION_DETAIL_SUCCESS", payload: { result } });
//       })
//       .catch((error) => {
//       });
//   };
// }







// export const detailquestionAction = { getQuestionDetail };
