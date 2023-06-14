import {combineReducers} from "redux";
import {userReducer} from './userReducer';
import {callReducer} from './callReducer';

export const rootReducer = combineReducers({
    userReducer: userReducer,
    callReducer: callReducer
});