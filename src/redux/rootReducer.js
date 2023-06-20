import {combineReducers} from "redux";
import {userReducer} from './userReducer';
import {callReducer} from './callReducer';
import {abonentReducer} from './abonentReducer';
import {cityReducer} from "./cityReducer";
import {auditReducer} from "./auditReducer";

export const appReducer = combineReducers({
    userReducer: userReducer,
    abonentReducer: abonentReducer,
    callReducer: callReducer,
    cityReducer: cityReducer,
    auditReducer: auditReducer
});


export const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}