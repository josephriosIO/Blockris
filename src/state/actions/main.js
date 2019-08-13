export const LOGINING_IN = "LOGINING_IN";

export const loginIn = () => async dispatch => {
  dispatch({
    type: LOGINING_IN
  });
};
