import axios from "axios";

const initialState = {
  user: [],
  sideTask: false,
  singleTask: []
};

const GET_USER = "GET_USER";
const SIDE_TASK_TOGGLE = "SIDE_TASK_TOGGLE";
const GET_TASK = "GET_TASK";

function reducer(state = initialState, action) {
  console.log(state, action);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, { user: action.payload.data });
    case `${GET_USER}_REJECTED`:
      console.log("REJECTED: ", action.payload);
      return Object.assign({}, state, { user: action.payload.data });
    case SIDE_TASK_TOGGLE:
      return Object.assign({}, state, {
        sideTask: !state.sideTask
      });
    case `${GET_TASK}_FULFILLED`:
      return Object.assign({}, state, { singleTask: action.payload.data });
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

export function sideTask() {
  return {
    type: SIDE_TASK_TOGGLE
  };
}

export function getTask(id) {
  return {
    type: GET_TASK,
    payload: axios.get(`/api/getSingleTask/${id}`)
  };
}
