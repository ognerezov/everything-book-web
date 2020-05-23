import { Method, sendAsync} from "../service/connection";

//export const BASE_URL ='https://europe-west3-everything-book.cloudfunctions.net/';
export const BASE_URL ='http://localhost:8080/';


export function getCloudDataAsync(path : string, auth : string| undefined = undefined,  method : Method = Method.GET, object : any=undefined): Promise<string> {
    const url = BASE_URL + path;
    const msg = object ? JSON.stringify(object) : undefined;
    return new Promise<string>(async (resolve,reject)=>{
        try {
            resolve((await sendAsync(method,url,msg,auth)).message);
        }catch (e) {
            reject(e);
        }
    })
}