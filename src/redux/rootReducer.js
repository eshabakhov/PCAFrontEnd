import {combineReducers} from "redux";
import {userReducer} from './userReducer';
import {authReducer} from './authReducer'
import {othersReducer} from "./othersReducer";
//import {employeeReducer} from './employeeReducer';
//import {othersReducer} from './othersReducer';

export const rootReducer = combineReducers({
    userReducer: userReducer,
//    authReducer,
//    animalTypeReducer,
//    employeeReducer,
    othersReducer
});