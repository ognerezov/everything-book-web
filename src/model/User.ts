export interface User {
    hasAccess ?: boolean;
    accessCode ?: string;
    token ?: string;
    refreshToken ?: string;
    id ?:string;
}

export function isLoggedIn(user : User) : boolean {
    return !!user.hasAccess && !!user.accessCode;
}