import {Chapter} from "../model/Book";
import {Action} from "redux";

export enum BookOperation {
    Get

}

export interface BookAction extends Action<BookOperation>{
    chapters : Chapter[];
}

export function gotChapter(chapter: Chapter) : BookAction {
   return {
       chapters :[chapter],
       type : BookOperation.Get
   }
}
export function gotChapters(chapters: Chapter[]) : BookAction {
   return {
       chapters,
       type : BookOperation.Get
   }
}