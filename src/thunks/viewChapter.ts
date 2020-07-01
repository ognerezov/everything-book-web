import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {Book} from "../model/Book";
import {viewChapter} from "../actions/settings";
import {saveSettings} from "../service/LocalStorage";
import {proceedGetChapter} from "./getChapter";

export default (number : number): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const book : Book = getState().book;
    dispatch(viewChapter(number));
    if(!book[number]){
        await proceedGetChapter([number],dispatch,getState);
    }
    saveSettings(getState().settings);
};