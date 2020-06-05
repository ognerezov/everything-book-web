import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {registerAsync} from "../dao/UserDao";
import {User} from "../model/User";
import {registered, setUserLoggedOut} from "../actions/user";
import {saveUser} from "../service/LocalStorage";
import {ConnectionResponse} from "../service/connection";
import {onProcess} from "../actions/error";

export const register =(username: string, password: string,
                        errorHandler : (e: ConnectionResponse)=>void, successHandler : ()=>void =()=>{} ): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    try {
        dispatch(onProcess());
        const user : User = await registerAsync(username,password);
        dispatch(registered(user));
        saveUser(getState().user);
        successHandler();
    }catch (e) {
        errorHandler(e);
    }
};

export const logout =(): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(setUserLoggedOut());
    saveUser(getState().user);
};