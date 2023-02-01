function getQuestionDetail(id){
    return async (dispatch,getState)=>{
        let url = `http://i8a508.p.ssafy.io:8080/api/v1/questions/${id}`;
        let response = await fetch(url);
        let data = await response.json();
        let result = data.question
        dispatch({type:"GET_QUESTION_DETAIL_SUCCESS",payload:{result}})

    }   
}
export const detailquestionAction = {getQuestionDetail}