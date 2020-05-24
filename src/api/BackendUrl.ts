export const DEVELOPMENT_URL : string = 'http://localhost:8080/';
export const PRODUCTION_URL : string = 'https://everything-from.one/';

export function getBaseUrl():string {
    return process.env.NODE_ENV === 'development' ? DEVELOPMENT_URL : PRODUCTION_URL;
}

export function getUrl(path : string) {
    return getBaseUrl() + path;
}