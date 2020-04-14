import {Chapter} from "./Book";

export interface Data {
    rules ?: Rule [];
    quotations ?: Chapter[];
}

export interface Rule {
    number : number;
    rule : string[];
}