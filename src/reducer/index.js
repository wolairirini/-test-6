import {combineReducers} from "redux";
import globalreducers from "../globalreducers.js";
import home from "../pages/home/reducer";
import find from '../pages/find/reducer';

const reducers = combineReducers({
    ...globalreducers,
    home,
    find
})

export default reducers;