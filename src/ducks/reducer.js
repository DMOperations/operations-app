import axios from "axios";

const initialState = {
  user: []
};

const GET_USER = "GET_USER";

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, { user: action.payload.data });
    case `${GET_USER}_REJECTED`:
      console.log("REJECTED: ", action.payload);
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
