import {Chapter} from "../model/Book";
import {Action} from "redux";

export enum BookOperation {
    Get
}

export interface BookAction extends Action<BookOperation>{
    chapter : Chapter;
}

export function gotChapter(chapter: Chapter) : BookAction {
   return {
       chapter,
       type : BookOperation.Get
   }
}