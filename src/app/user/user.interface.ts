export interface IUser {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    photo: string;
    address?: string
    university?: string;
    role: "student" | "admin";
}