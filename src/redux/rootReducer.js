import {combineReducers} from "redux";
import {userReducer} from './userReducer';
import {callReducer} from './callReducer';
import {abonentReducer} from './abonentReducer';

export const rootReducer = combineReducers({
    userReducer: userReducer,
    abonentReducer: abonentReducer
    callReducer: callReducer
});