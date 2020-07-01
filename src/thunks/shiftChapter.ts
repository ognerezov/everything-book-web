import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {Book} from "../model/Book";
import {closeLayer, setChapter, shiftChapter} from "../actions/settings";
import {saveSettings} from "../service/LocalStorage";
import {proceedGetChapter} from "./getChapter";
import {getSelectedNumber} from "../model/Settings";

export const nextChapter= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(shiftChapter(1));
    dispatch(processBook());
};

export const previousChapter= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(shiftChapter(-1));
    dispatch(processBook());
};

export const gotoChapter= (number :number): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(setChapter(number));
    dispatch(processBook());
};

export const processBook= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const book : Book = getState().book;
    saveSettings(getState().settings);
    const number = getSelectedNumber(getState().settings)
    console.log(number);
    console.log(getState().settings);
    if(!book[number]){
        await proceedGetChapter([number],dispatch,getState);
    }
};

export const closeChapter= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(closeLayer());
    saveSettings(getState().settings);
};
