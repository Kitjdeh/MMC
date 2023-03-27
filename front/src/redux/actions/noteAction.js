import { apiInstance } from "../../api";
const api = apiInstance();
let baseURL=`http://i8a508.p.ssafy.io:8083/api/v1/notes`;

function makeLectureNote(question_id) {
    const inputs={
        questionId: question_id,
    }
  return async () => {
    let url = baseURL;
    let response = await api.post(url, JSON.stringify(inputs), {headers: {
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

function getLectureNote(lecture_note_id) {
    console.log(lecture_note_id);
  return async (dispatch) => {
    let url = baseURL+`/${lecture_note_id}`;
    let response = await api.get(url)
      .then((response) => {
        let data = response.data.lectureNoteId;
        console.log("getLectureNote",data);
        dispatch({type:"GET_LECTURE_NOTE_SUCCESS", payload: {data}})
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function modifyNote(lecture_note_id){
    // console.log(lecture_note_id)
    // const inputs={
    //     lectureNoteId: lecture_note_id,   
		// lectureTime: 90,
    // }
    // return async () => {
    //   // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    //   let url = baseURL+`/${lecture_note_id}`;
    //   let response = await api.patch(url, JSON.stringify(inputs), {headers: {
    //     "Content-Type": "application/json;charset=utf-8"}})
    //     .then((response) => {
    //       let data = response.data;
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.log("ERROR", error);
    //     });
    // };
  }

function deleteNote(lecture_note_id){
    // return async () => {
    //   // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    //   let url = baseURL+`/${lecture_note_id}`;
    //   let response = await api.delete(url)
    //     .then((response) => {
    //       let data = response.data;
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.log("ERROR", error);
    //     });
    // };
  }

export const noteAction = { makeLectureNote, getLectureNote, modifyNote, deleteNote };
