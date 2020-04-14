import {Data, Rule} from "../model/Rules";
import {DataAction, DataType} from "../actions/data";
import {Chapter} from "../model/Book";

export default function(data : Data={},action: DataAction):Data {
    let rules : Rule[];
    let quotations : Chapter[];
    switch (action.type) {
        case DataType.Rules:
            rules = JSON.parse(action.data);
            return {...data,rules};
        case DataType.Quotations:
            quotations = JSON.parse(action.data);
            return {...data,quotations};
        default:
            return data;
    }
}