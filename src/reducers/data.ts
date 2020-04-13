import {Data, Rule} from "../model/Rules";
import {DataAction, DataType} from "../actions/data";

export default function(data : Data={},action: DataAction):Data {
    let rules : Rule[];
    switch (action.type) {
        case DataType.GotRules:
            rules = JSON.parse(action.data);
            return {...data,rules};
        default:
            return data;
    }
}