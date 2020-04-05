import {applyMiddleware, combineReducers, createStore} from 'redux';
import bookReducer from '../reducers/book';
import settingsReducer from "../reducers/settings";
import thunkMiddleware from "redux-thunk";
import {STORED_SETTINGS} from "../utils/Literals";
import {Settings} from "../model/Settings";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    book : bookReducer,
    settings :settingsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

function init() :AppState {
    const settingsStr = localStorage.getItem(STORED_SETTINGS);
    const settings : Settings = settingsStr ? JSON.parse(settingsStr) : {layers: [3]};
    return {
        settings,
        book : {}
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