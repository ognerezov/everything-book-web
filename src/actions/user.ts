import {Action} from "redux";

export enum UserActionType {
    SetAccessCode ='set access code',
    DeleteAccessCode = 'delete access code',
    SetLoggedIn = 'set logged in',
    SetLoggedOut = 'set logged out'
}

export interface UserAction extends Action<UserActionType>{
    value ?: string;
}

export function setTemporalPassword(value : string) : UserAction{
    return {
        type : UserActionType.SetAccessCode,
        value
    }
}

export function deleteTemporalPassword(): UserAction {
    return {
        type : UserActionType.DeleteAccessCode
    }
}

export function setUserLoggedIn() {
    return {
        type : UserActionType.SetLoggedIn
    }
}

export function setUserLoggedOut() {
    return {
        type : UserActionType.SetLoggedOut
    }
}