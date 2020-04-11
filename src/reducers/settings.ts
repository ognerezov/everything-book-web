import {Settings} from "../model/Settings";
import {SettingsAction, SettingsOperation} from "../actions/settings";

export default function (settings : Settings = {layers: [1]}, action: SettingsAction) : Settings {
    let layers : number[]= [...settings.layers];
    switch (action.type) {
        default:
            return settings;
        case SettingsOperation.View:
            layers.push(action.number);
            return {...settings,layers};
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
            return {...settings,layers};
        case SettingsOperation.Collapse:
            return {...settings,layers : [layers[0]]};
    }
}