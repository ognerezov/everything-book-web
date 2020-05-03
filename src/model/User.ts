export interface User {
    isLoggedIn ?: boolean;
    accessCode ?: string;
    id ?:string;
}

export function isLoggedIn(user : User) : boolean {
    return !!user.isLoggedIn && !!user.accessCode;
}