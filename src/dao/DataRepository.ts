import {get, post} from "../service/connection";

//export const BASE_URL ='https://europe-west3-everything-book.cloudfunctions.net/';
export const BASE_URL ='http://localhost:8080/book/';


export function getCloudDataAsync(path : string,password ?: string): Promise<string> {
    const url = BASE_URL + path;
    // const msg = password ? JSON.stringify({
    //     'password' : password
    // }) : undefined;
    const msg = undefined;
    return new Promise<string>(async (resolve,reject)=>{
        try {
            resolve(msg ? (await  post(url,msg)).message: (await get(url)).message);
        }catch (e) {
            reject(e);
        }
    })
}