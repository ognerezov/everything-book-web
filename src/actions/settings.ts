import {Action} from "redux";

export enum SettingsOperation {
    View = "view",
    Close ="close",
    Collapse ="collapse"
}

export interface SettingsAction extends Action<SettingsOperation>{
    number : number;
}

export function viewChapter(number : number) :SettingsAction {
    return {
        type : SettingsOperation.View,
        number
    }
}

export function closeChapter(number : number) :SettingsAction {
    return {
        type : SettingsOperation.Close,
        number
    }
}

export function collapse() :SettingsAction {
    return {
        type : SettingsOperation.Collapse,
        number : 0
    }
}
