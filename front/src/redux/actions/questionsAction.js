function getQuestions(){
    return async (dispatch,getState)=>{
        let url = `http://localhost:5000/questions`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        dispatch({type:"GET_PRODUCT_SUCCESS",payload:{data}})
        console.log('222')
    }   
}
export const questionAction = {getQuestions}