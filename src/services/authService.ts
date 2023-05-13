import { User, getUserByEmail } from "./userServices";

export interface LoginData {
    email: string;
    password: string;
}

export const login = async (loginData: LoginData): Promise<User> => {
    const user = await getUserByEmail(loginData.email);

    if (user && user.password === loginData.password) {
        return user;
    } else {
        throw new Error("Email e/ou senha incorreto(s).");
    }
} 