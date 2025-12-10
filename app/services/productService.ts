import { GET_PRODUCTS_ENDPOINT, URL_BASE } from "~/consts";
import type { GetProductsRequestParams, GetProductsResponseParams, Order, Product } from "~/types";


export const ProductService = {
    getProducts: async (params: GetProductsRequestParams): Promise<GetProductsResponseParams> => {
        try {

            const urlParams = new URLSearchParams(params);

            const response = await fetch(`${URL_BASE}${GET_PRODUCTS_ENDPOINT}?${urlParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unbekannter Fehler");
            }

            return data as GetProductsResponseParams;
        }
        catch (error) {
            console.error("Ein Fehler bei dem Abrufen der Produkte:", error);
            throw error;
        }
    },
}