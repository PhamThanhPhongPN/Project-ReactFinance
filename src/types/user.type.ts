export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    DEACTIVATE = "DEACTIVATE",
    BAN = "BAN"
}

export  interface User {
    id: string,
    fullName: string,
    email: string,
    password: string,
    phone: string,
    gender: boolean,
    status: UserStatus,
    role:  UserRole
}