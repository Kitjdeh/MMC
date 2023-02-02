


function getUserInfo() {
  return async (dispatch, getState) => {
    let url = `http://localhost:5000/user`;
    let response = await fetch(url);
    let data = await response.json();
    dispatch({ type: "GET_USERINFO_SUCCESS", payload: { data } });
  };
}
export const userinfoAction = { getUserInfo };
