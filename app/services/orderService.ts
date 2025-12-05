import { CREATE_ORDER_ENDPOINT, URL_BASE } from "~/consts";
import { getToken } from "~/helpers";
import type { CreateOrderRequestParams, Order, User } from "~/types";


export const OrderService = {
    createOrder: async (orderData: CreateOrderRequestParams): Promise<Order> => {
        try {
            const token = getToken();

            const response = await fetch(`${URL_BASE}${CREATE_ORDER_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(orderData),
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }

            return data.order as Order;
        }
        catch (error) {
            console.error("Ein Fehler bei dem Erstellen der Bestellung:", error);
            throw error;
        }
    },
}