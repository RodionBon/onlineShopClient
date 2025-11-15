import { URL_BASE, SIGN_IN_ENDPOINT, SIGN_UP_ENDPOINT, GET_USER_ENDPOINT } from "~/consts";
import type { User } from "~/types";

export type SignInRequestParams = {
    email: string;
    password: string;
}

export type SignInResponse = {
    token: string;
    user: User;
}

export type SignUpRequestParams = {
    email: string;
    password: string;
}

export type SignUpResponse = {
    token: string;
    user: User;
}

export const UserService = {
    signIn: async (params: SignInRequestParams): Promise<SignInResponse> => {
        try {
            const response = await fetch(`${URL_BASE}${SIGN_IN_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }

            return data;
        }
        catch (error) {
            console.error("Ein Fehler bei der Anmeldung:", error);
            throw error;
        }
    },
    signUp: async (params: SignUpRequestParams): Promise<SignUpResponse> => {
        try {
            const response = await fetch(`${URL_BASE}${SIGN_UP_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }

            return data;
        }
        catch (error) {
            console.error("Ein Fehler bei der Registrierung:", error);
            throw error;
        }
    },
    getUser: async (token: string): Promise<User> => {
        try {
            const response = await fetch(`${URL_BASE}${GET_USER_ENDPOINT}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }

            return data.user;
        }
        catch (error) {
            console.error("Ein Fehler beim Abrufen des Benutzers:", error);
            throw error;
        }
    }
}