export interface User {
    hasAccess ?: boolean;
    accessCode ?: string;
    token ?: string;
    refreshToken ?: string;
    username ?:string;
    emailStatus ?: string;
}

export function isLoggedIn(user : User) : boolean {
    return !!user.hasAccess && !!user.accessCode;
}