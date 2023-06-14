import {combineReducers} from "redux";
import {userReducer} from './userReducer';
import {abonentReducer} from './abonentReducer';

export const rootReducer = combineReducers({
    userReducer: userReducer,
    abonentReducer: abonentReducer
});