export interface IUser {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    photo: string;
    role: "student" | "admin";
}