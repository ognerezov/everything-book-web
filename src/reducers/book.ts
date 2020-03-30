import {Book} from "../model/Book";
import {BookAction, BookOperation} from "../actions/book";

export default function (book : Book ={},action : BookAction): Book {
        let newBook = {...book};
        switch (action.type) {
            default:
                return book;
            case BookOperation.Get:
                newBook[action.chapter.number] = action.chapter;
            return newBook;
        }
}