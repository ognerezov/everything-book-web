import {post} from "../service/connection";

export const BASE_URL ='https://europe-west3-everything-book.cloudfunctions.net/';

export function getCloudDataAsync(path : string,password ?: string): Promise<string> {
    const url = BASE_URL + path;
    const msg = JSON.stringify({
        'password' : password
    });
    return new Promise<string>(async (resolve,reject)=>{
        try {
            resolve((await  post(url,msg)).message);
        }catch (e) {
            reject(e);
        }
    })
}