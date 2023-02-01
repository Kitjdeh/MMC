function getQuestions(){
    return async (dispatch,getState)=>{
        let url = `http://i8a508.p.ssafy.io:8080/questions`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        dispatch({type:"GET_QUESTIONS_SUCCESS",payload:{data}})
        console.log('222')
    }   
}
export const questionAction = {getQuestions}