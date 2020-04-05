import {STORED_SETTINGS} from "../utils/Literals";
import {Settings} from "../model/Settings";


export function saveSettings(settings : Settings) {
    localStorage.setItem(STORED_SETTINGS,JSON.stringify(settings));
}