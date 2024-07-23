export interface User {
    username : string;
    email : string;
    password? : string;
    id?: number;
}

export interface AuthUser {
    user: Partial<User>;
    token: string;
}