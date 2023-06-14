import {combineReducers} from "redux";
import {userReducer} from './userReducer';
import {callReducer} from './callReducer';
import {abonentReducer} from './abonentReducer';
import {cityReducer} from "./cityReducer";

export const rootReducer = combineReducers({
    userReducer: userReducer,
    abonentReducer: abonentReducer,
    callReducer: callReducer,
    cityReducer: cityReducer
});