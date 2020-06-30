import {Settings} from "../model/Settings";
import {SettingsAction, SettingsOperation} from "../actions/settings";
import {BookAction, BookOperation} from "../actions/book";

export default function (settings : Settings = {layers: [1]}, action: SettingsAction | BookAction) : Settings {
    let layers : number[]= [...settings.layers];
    switch (action.type) {
        default:
            return settings;
        case SettingsOperation.View:
            layers.push(action.number);
            return {...settings,layers, selected : undefined};
        case SettingsOperation.Select:
            return {...settings,selected :action.number};
        case SettingsOperation.Shift:
            layers[layers.length-1] += action.number;
            return {...settings,layers};
        case SettingsOperation.Set:
            layers[layers.length-1] = action.number;
            return {...settings,layers};
        case SettingsOperation.Close:
            if(layers.length > 1){
                layers.pop();
            }
            return {...settings,layers, selected : undefined};
        case SettingsOperation.Collapse:
            return {...settings,layers : [layers[0]], selected : undefined};
        case BookOperation.Found:
            const  ba : BookAction = action as BookAction;
            return {...settings, layers : ba.chapters.map(chapter => chapter.number), selected : undefined}
    }
}