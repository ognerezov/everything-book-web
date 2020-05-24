import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {User} from "../model/User";

import {registered} from "../actions/user";
import {saveUser} from "../service/LocalStorage";
import {refreshAsync} from "../dao/UserDao";

export const refresh =(): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const currentUser : User = getState().user;
    if(!currentUser) return ;
    try {
        const token = currentUser.refreshToken;
        if(!token) return;
        const user : User = await refreshAsync(token);
        user.accessCode = currentUser.accessCode;
        dispatch(registered(user));
        saveUser(getState().user);
    }catch (e) {
        currentUser.token = undefined;
        currentUser.refreshToken = undefined;
        currentUser.username = undefined;
        dispatch(registered(currentUser));
        saveUser(getState().user);
    }
};