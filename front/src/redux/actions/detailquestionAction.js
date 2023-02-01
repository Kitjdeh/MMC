function getQuestionDetail(questionId){
    return async (dispatch,getState)=>{
        let url = `http://localhost:5000/questions/${questionId}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data,"문제디테일action")
        dispatch({type:"GET_QUESTION_DETAIL_SUCCESS",payload:{data}})

    }   
}
export const detailquestionAction = {getQuestionDetail}