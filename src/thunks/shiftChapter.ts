import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {Book} from "../model/Book";
import {shiftChapter} from "../actions/settings";
import {saveSettings} from "../service/LocalStorage";
import {proceedGetChapter} from "./getChapter";

export const nextChapter= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(shiftChapter(1));
    const book : Book = getState().book;
    const layers = getState().settings.layers;
    saveSettings(getState().settings);
    const number = layers[layers.length-1];
    if(!book[number]){
        await proceedGetChapter([number],dispatch,getState);
    }
};

export const previousChapter= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(shiftChapter(-1));
    const book : Book = getState().book;
    const layers = getState().settings.layers;
    saveSettings(getState().settings);
    const number = layers[layers.length-1];
    if(!book[number]){
        await proceedGetChapter([number],dispatch,getState);
    }
};