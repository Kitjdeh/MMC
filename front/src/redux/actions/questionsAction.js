function getQuestions(){
    return async (dispatch,getState)=>{
        let url = `http://i8a508.p.ssafy.io:8080/api/v1/questions`;
        let response = await fetch(url);
        let data = await response.json();
        let result = data.questions
        dispatch({type:"GET_QUESTIONS_SUCCESS",payload:{result}})
    }   
}
export const questionAction = {getQuestions}