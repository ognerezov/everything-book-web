import {Action} from "redux";

export enum SettingsOperation {
    View = "view",
    Close ="close",
    Collapse ="collapse",
    Shift = "shift",
    Set = "Set"
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

export function shiftChapter(number :number) :SettingsAction {
    return {
        type : SettingsOperation.Shift,
        number
    }
}

export function setChapter(number :number) :SettingsAction {
    return {
        type : SettingsOperation.Set,
        number
    }
}

export function closeChapter() :SettingsAction {
    return {
        type : SettingsOperation.Close,
        number : -1
    }
}

export function collapse() :SettingsAction {
    return {
        type : SettingsOperation.Collapse,
        number : 0
    }
}
