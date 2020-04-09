import {User} from "../model/User";
import {UserAction, UserActionType} from "../actions/user";

export default function (user : User={}, action : UserAction ) : User {
    switch (action.type) {
        case UserActionType.SetAccessCode:
         return {...user, accessCode : action.value};
        case UserActionType.DeleteAccessCode:
            return {...user,accessCode : undefined};
        case UserActionType.SetLoggedIn:
            return {...user,isLoggedIn : true};
        case UserActionType.SetLoggedOut:
            return {...user,accessCode : undefined,isLoggedIn :false};
        default:
            return user;
    }
}