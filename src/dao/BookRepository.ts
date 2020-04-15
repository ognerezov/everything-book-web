import {ConnectionResponse, post} from "../service/connection";
import {Chapter} from "../model/Book";

// const CLOUDFRONT_URL="https://dkgst0c5d57yn.cloudfront.net/";
// const EXTENSION = ".json";
//const DEV_PASSWORD ='dev';
const FIREBASE_GET_CHAPTER_URL='https://europe-west3-everything-book.cloudfunctions.net/getChapters';

// export function getChapterAsync(number:number) : Promise<Chapter> {
//     const url = CLOUDFRONT_URL + number +EXTENSION;
//     return new Promise<Chapter>(async function (resolve, reject) {
//         try {
//             const response : ConnectionResponse = await get(url);
//             resolve(JSON.parse(response.message))
//         }catch (e) {
//             console.log(e);
//             reject(e);
//         }
//     })
// }

export function getChaptersAsync(values:number[], password ?: string) : Promise<Chapter[]> {
    const url = FIREBASE_GET_CHAPTER_URL;
    const distinct = new Set<number>(values)
    const numbers : number[] =[];
    distinct.forEach(val=>numbers.push(val));
    const msg = JSON.stringify({
       'password' : password,
       numbers
    });
    return new Promise<Chapter[]>(async function (resolve, reject) {
        try {
            const response : ConnectionResponse = await post(url,msg);
            resolve(JSON.parse(response.message))
        }catch (e) {
            reject(e);
        }
    })
}