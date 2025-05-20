import mongoose from "mongoose";
import dotenv from 'dotenv';

import { Sneaker } from "../schemas/sneaker";
import { Currency } from "../schemas/currency";
import { Store } from "../schemas/store";
import { Provider } from "../schemas/provider";

import sneakerSeedData from "../../seeds/sneakers/sneakers.json";
import currencySeedData from "../../seeds/currencies.json";
import storeSeedData from "../../seeds/stores/stores.json";
import providerSeedData from "../../seeds/providers/providers.json";

dotenv.config({ path: '../../.env' });

export default async function connectDB(): Promise<void> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected : ${conn.connection.host}`);
        await seedDatabase();

    } catch (error) {
        console.error(`Error while connecting to DB : ${error}`);
        process.exit(1);
    }
}

export async function seedDatabase() {
    try {
        await Promise.all([
            seedSneakers(),
            seedCurrencies(),
            seedStores(),
            seedProviders()
        ]);
    } catch (error) {
        console.error("Seeding failed:", error);
        throw error;
    }
}

async function seedSneakers() {
    const sneakersCount = await Sneaker.countDocuments();

    if (sneakersCount > 0) {
        console.log(`Found ${sneakersCount} documents in 'sneakers' - skipping seed`);
        return;
    }

    await Sneaker.insertMany(sneakerSeedData);
    console.log(`Seeded ${sneakerSeedData.length} documents in 'sneakers'`);
}

async function seedCurrencies() {
    const currenciesCount = await Currency.countDocuments();

    if (currenciesCount > 0) {
        console.log(`Found ${currenciesCount} documents in 'currencies' - skipping seed`);
        return;
    }

    await Currency.insertMany(currencySeedData);
    console.log(`Seeded ${currencySeedData.length} documents in 'currencies'`);
}

async function seedStores() {
    const storesCount = await Store.countDocuments();

    if (storesCount > 0) {
        console.log(`Found ${storesCount} documents in 'stores' - skipping seed`);
        return;
    }

    await Store.insertMany(storeSeedData);
    console.log(`Seeded ${storeSeedData.length} documents in 'stores'`);
}

async function seedProviders() {
    const providersCount = await Provider.countDocuments();

    if (providersCount > 0) {
        console.log(`Found ${providersCount} documents in 'providers' - skipping seed`);
        return;
    }

    await Provider.insertMany(providerSeedData);
    console.log(`Seeded ${providerSeedData.length} documents in 'providers'`);
}
