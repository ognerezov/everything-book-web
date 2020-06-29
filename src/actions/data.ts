import {Action} from "redux";

export enum DataType {
    Rules = "book/rules",
    Quotations = "free/quotations",
    Search = 'book/search/'
}

export interface DataAction extends Action<DataType>{
    data : string;
}

export function gotData(type : DataType, data : string):DataAction {
     return {
         type,
         data
     }
}