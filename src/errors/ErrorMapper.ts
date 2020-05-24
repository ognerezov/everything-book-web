import {ConnectionResponse} from "../service/connection";
import {ExceptionType} from "../actions/error";
import {operation_error, user_exists, V} from "../vocabulary/Vocabulary";

export function getErrorMessage(response : ConnectionResponse) : string {
     switch (response.status) {
         case ExceptionType.Conflict:
             return V[user_exists];
         default:
             return V[operation_error];
     }
}