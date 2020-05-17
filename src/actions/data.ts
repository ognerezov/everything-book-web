import {Action} from "redux";

export enum DataType {
    Rules = "rules",
    Quotations = "quotations"
    // Rules = "getRules",
    // Quotations = "getQuotation"
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