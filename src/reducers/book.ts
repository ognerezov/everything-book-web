import {Book} from "../model/Book";
import {BookAction, BookOperation} from "../actions/book";

export default function (book : Book ={},action : BookAction): Book {
        let newBook = {...book};
        switch (action.type) {
            default:
                return book;
            case BookOperation.Get:
                for(let i=0; i<action.chapters.length; i++){
                    newBook[action.chapters[i].number] = action.chapters[i];
                }
            return newBook;
        }
}