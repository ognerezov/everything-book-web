import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {gotChapters} from "../actions/book";
import {getChaptersAsync} from "../dao/BookRepository";


export const getChapters =(numbers : number[]): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const filtered = numbers.filter(n=>!getState().book[n]);
        dispatch(
            gotChapters(
                await getChaptersAsync(filtered)));
};