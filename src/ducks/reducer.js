import axios from "axios";

const initialState = {
  user: []
};

const GET_USER = "GET_USER";

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, { user: action.payload.data });
    default:
      return state;
  }
}

export default reducer;

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/getUser")
  };
}
