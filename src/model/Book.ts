export interface Book {
    [key :number] : Chapter;
}
export interface Chapter extends LevelFragment{
    number : number;
    records : Record[];
}

export interface Record extends LevelFragment{
    spans : Span [];
}

export interface LevelFragment {
    type : string;
    level : number;
}

export interface Span {
    text : string,
    isNumber : boolean
}