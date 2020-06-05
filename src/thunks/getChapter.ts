import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {gotChapters} from "../actions/book";
import {getChaptersAsync} from "../dao/BookRepository";
import {deleteAccessCode, setTemporalPassword} from "../actions/user";
import {onException,onProcess} from "../actions/error";
import {saveUser} from "../service/LocalStorage";
import {setUserLoggedIn} from "../actions/user";

export const getChapters =(numbers : number[]): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const filtered = numbers.filter(n=>!getState().book[n]);
    await proceedGetChapter(filtered,dispatch,getState);
};

export const getCurrentChapters =(): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const filtered = getState().settings.layers.filter(n=>!getState().book[n]);
    await proceedGetChapter(filtered,dispatch,getState);
};

export const enterCodeAndGetChapters =(accessCode : string): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(setTemporalPassword(accessCode));
    const filtered = getState().settings.layers.filter(n=>!getState().book[n]);
    await proceedGetChapter(filtered,dispatch,getState);
    if(getState().user.accessCode) {
        dispatch(setUserLoggedIn());
        saveUser(getState().user);
    }
};

export async function proceedGetChapter(numbers : number [],dispatch : any, getState : any) {
    dispatch(onProcess());
    try {
        dispatch(gotChapters(await getChaptersAsync(numbers,getState().user.accessCode)));
    }catch (e) {
        if(e.status === 401 || !getState().user.hasAccess){
            console.log(getState().user);
            dispatch(deleteAccessCode());
            saveUser(getState().user);
            console.log(getState().user);
        } else{
            console.log(e);
        }
        dispatch(onException(e.status,e.message));
    }

}