import axios from "axios";
import { Currency } from "../schemas/currency";

export const fetchAndSaveCurrencies = async () => {
    try {
        const url = process.env.CURRENCY_API_URL as string;

        const response = await axios.get(url);
        const { date, usd } = response.data;

        const operations = Object.entries(usd).map(([currency, rate]) => ({
            updateOne: {
              filter: { currency, date }, // Only update if 'currency' AND 'date' are different
              update: { $set: { rate } },
              upsert: true
            }
        }));

        const result = await Currency.bulkWrite(operations);

        const totalChanges = result.upsertedCount + result.modifiedCount;

        if (totalChanges > 0) {
            console.log(`Upserted or updated ${totalChanges} currency rates for ${date}`);
        } else {
            console.log("No currency changes detected");
        }

    } catch (err) {
        console.error('Error fetching or saving currencies:', err.message);
    }
}

const minutes = 1 * 60 * 1000; // 1 min

export const startCurrencyScheduler = () => {
    fetchAndSaveCurrencies();

    setInterval(() => {
        console.log("Fetching currencies...");
        fetchAndSaveCurrencies();
    }, minutes);
};
