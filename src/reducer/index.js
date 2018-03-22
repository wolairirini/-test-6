import {combineReducers} from "redux";
import globalreducers from "../globalreducers.js";
import home from "../pages/home/reducer";

const reducers = combineReducers({
    ...globalreducers,
    home,
})

export default reducers;