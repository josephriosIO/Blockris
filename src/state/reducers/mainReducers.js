import { LOGINING_IN } from "../actions";
import { UserSession, AppConfig } from "blockstack";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig: appConfig });

const intitalState = {
  appConfig,
  userSession
};

export const mainReducers = (state = intitalState, action) => {
  switch (action.type) {
    case LOGINING_IN:
      return { appConfig, userSession };

    default:
      return state;
  }
};
