import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {gotChapters} from "../actions/book";
import {getChaptersAsync} from "../dao/BookRepository";
import {Book} from "../model/Book";
import {viewChapter} from "../actions/settings";
import {saveSettings} from "../service/LocalStorage";

export default (number : number): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const book : Book = getState().book;
    dispatch(viewChapter(number));
    saveSettings(getState().settings);
    if(!book[number]){
        dispatch(
            gotChapters(
                await getChaptersAsync([number])));
    }
};