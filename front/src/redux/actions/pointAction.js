import axios from "axios";
let baseURL=`http://localhost:8080/api/v1`;

function sendDepositAndWithdrawl(trade) {
    console.log(trade);
  return async (dispatch) => {
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/mypage/points`;
    let url = baseURL+`/mypage/points`;
    let response = await axios.post(url, JSON.stringify(trade), {headers: {
        "Content-Type": "application/json;charset=utf-8"}})
      .then((response) => {
        console.log("리스폰성공", response);
        let data = response.data;
        console.log(data);
        // dispatch({ type: "GET_POINT_DETAIL_SUCCESS", payload: { result } });
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function getDepositAndWithdrawList(user_id){
    console.log("getDepositAndWithdrawList");
    return async (dispatch)=>{
        let url = baseURL+`/mypage/points/${user_id}`;
        let response = await axios.get(url)
        .then((response)=>{
            let data=response.data;
            console.log(data);
            dispatch({type:"GET_POINT_LIST_SUCCESS", payload:{data}});
        })
        .catch((error)=>{
            console.log("fail",error);
        })
    }
}

export const pointAction = { sendDepositAndWithdrawl, getDepositAndWithdrawList };