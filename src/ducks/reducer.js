import axios from "axios";

const initialState = {
  user: {},
  sideTask: false,
  singleTask: [],
  comments: []
};

const GET_USER = "GET_USER";
const SIDE_TASK_TOGGLE = "SIDE_TASK_TOGGLE";
const GET_TASK = "GET_TASK";
const GET_COMMENTS = "GET_COMMENTS";
const POST_COMMENT = "POST_COMMENT";

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, { user: action.payload.data });
    case `${GET_USER}_REJECTED`:
      console.log("REJECTED: ", action.payload);
      return Object.assign({}, state, { user: action.payload.data });
    case SIDE_TASK_TOGGLE:
      return Object.assign({}, state, {
        sideTask: true
      });
    case `${GET_TASK}_FULFILLED`:
      return Object.assign({}, state, { singleTask: action.payload.data });
    case `${GET_COMMENTS}_FULFILLED`:
      return Object.assign({}, state, { comments: action.payload.data });
    case `${POST_COMMENT}_FULFILLED`:
      return Object.assign({}, state, { comments: action.payload.data });
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

export function getComments(id) {
  return {
    type: GET_COMMENTS,
    payload: axios.get(`/api/getComments/${id}`)
  };
}

export function postComment(obj) {
  return {
    type: POST_COMMENT,
    payload: axios.post("/api/addComment", { obj })
  };
}
