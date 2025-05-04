import { Currency } from "../../schemas/currency";

export async function getCurrencyRate(currency: string) {
    if (!currency) return 1;

    const existingCurrency = await Currency.findOne({ currency });

    if (existingCurrency && existingCurrency.rate) {
        return existingCurrency.rate;
    }

    throw new Error('Invalid currency');
}