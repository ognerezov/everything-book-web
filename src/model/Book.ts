export interface Book {
    [key :number] : Chapter;
}
export interface Chapter extends LevelFragment{
    level : number;
    records : Record[];
}

export interface Record extends LevelFragment{
    spans : Span [];
}

export interface LevelFragment {
    number : number;
    type : string;
}

export interface Span {
    text : string,
    number : boolean
}

export const LEVEL = 'level';
export const CHAPTER = 'chapter';
export const FORMULA = 'formula';
export const RULE = 'rule';
export const RULE_BODY='rule body';
export const QUOTATION = 'quotation';
export const POEM = 'poem';
export const REGULAR = 'regular';

export const MIN_CHAPTER = 1;
export const MAX_CHAPTER = 231;

export function isNumberDisabled(record : Record, str : string) {
    const number = Number(str);
    return number === record.number || number < MIN_CHAPTER || number > MAX_CHAPTER;
}
