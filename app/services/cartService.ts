import { ADD_TO_CART_ENDPOINT, DELETE_CART_ITEM_ENDPOINT, GET_CART_ENDPOINT, UPDATE_CART_ITEM_ENDPOINT, URL_BASE } from "~/consts";
import { getToken } from "~/helpers";
import type { CartItem } from "~/types";


export const CartService = {
    getCart: async (): Promise<CartItem[]> => {
        try {
            const token = getToken();

            const response = await fetch(`${URL_BASE}${GET_CART_ENDPOINT}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }

            return data.cartItems as CartItem[];
        }
        catch (error) {
            console.error("Ein Fehler bei dem Abrufen des Warenkorbs:", error);
            throw error;
        }
    },
    addToCart: async (productId: number): Promise<CartItem> => {
        try {
            const token = getToken();

            const response = await fetch(`${URL_BASE}${ADD_TO_CART_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ productId }),
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }

            return data.addedItem as CartItem;
        }
        catch (error) {
            console.error("Ein Fehler bei dem Hinzufügen zum Warenkorb:", error);
            throw error;
        }
    },
    updateCartItem: async (productId: number, quantity: number): Promise<CartItem> => {
        try {
            const token = getToken();

            const response = await fetch(`${URL_BASE}${UPDATE_CART_ITEM_ENDPOINT}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ productId, quantity }),
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }

            return data.updatedItem as CartItem;
        }
        catch (error) {
            console.error("Ein Fehler bei dem Aktualisieren des Warenkorbs:", error);
            throw error;
        }
    },
    deleteCartItem: async (productId: number): Promise<void> => {
        try {
            const token = getToken();

            const query = new URLSearchParams({ productId: productId.toString() }).toString();

            const response = await fetch(`${URL_BASE}${DELETE_CART_ITEM_ENDPOINT}?${query}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }
        }
        catch (error) {
            console.error("Ein Fehler bei dem Löschen des Artikels:", error);
            throw error;
        }
    },
}