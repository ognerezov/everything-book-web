import {applyMiddleware, combineReducers, createStore} from 'redux';
import bookReducer from '../reducers/book';
import settingsReducer from "../reducers/settings";
import userReducer from "../reducers/user";
import errorReducer from "../reducers/error";
import dataReducer from "../reducers/data";
import thunkMiddleware from "redux-thunk";
import {STORED_SETTINGS, STORED_USER} from "../utils/Literals";
import {Settings} from "../model/Settings";
import {composeWithDevTools} from "redux-devtools-extension";
import {noException} from "../actions/error";
import {User} from "../model/User";

const rootReducer = combineReducers({
    book : bookReducer,
    settings :settingsReducer,
    user : userReducer,
    error : errorReducer,
    data : dataReducer
});

export type AppState = ReturnType<typeof rootReducer>;

function init() :AppState {
    const settingsStr = localStorage.getItem(STORED_SETTINGS);
    const settings : Settings = settingsStr ? JSON.parse(settingsStr) : {layers: [3]};
    const userStr = localStorage.getItem(STORED_USER);
    const user : User = userStr ? JSON.parse(userStr) : {};
    return {
        settings,
        book : {},
        error : noException(),
        user,
        data :{}
    }
}

export function configureStore() {
    return createStore(
        rootReducer,
        init(),
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
}

export const store = configureStore();