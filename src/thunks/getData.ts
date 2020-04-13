import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {DataType, gotData} from "../actions/data";
import {getCloudDataAsync} from "../dao/DataRepository";

export const getData =(type : DataType): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    console.log(type);
    dispatch(gotData(type,await getCloudDataAsync(type,getState().user.accessCode)));
};