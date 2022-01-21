// ACTIONS

const GET_USER = "GET_USER";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";
const SET_LAST_ACTIVITY = "SET_LAST_ACTIVITY";

// ACTION CREATORS
export const setLastActivity = (activity) => {
  return {
    type: SET_LAST_ACTIVITY,
    activity,
  };
};

export const gotUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_LAST_ACTIVITY:
      return {
        ...state,
        activity: action.activity,
      };
    default:
      return state;
  }
};

export default reducer;
