export interface User {
    isLoggedIn ?: boolean;
    accessCode ?: string;
    token ?:string;
}

export function isLoggedIn(user : User) : boolean {
    return !!user.isLoggedIn && !!user.accessCode;
}