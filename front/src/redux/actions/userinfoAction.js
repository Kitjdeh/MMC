function getUserInfo() {
  return async (dispatch, getState) => {
    let url = `http://localhost:5000/user`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    dispatch({ type: "GET_USERINFO_SUCCESS", payload: { data } });
    console.log("userinfosuccess");
  };
}
export const userinfoAction = { getUserInfo };
