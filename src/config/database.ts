import mongoose from "mongoose";
import dotenv from 'dotenv';

import { Sneaker } from "../schemas/sneaker";
import sneakerSeedsData from "../../seeds/sneakers/sneakers.json";

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
        const count = await Sneaker.countDocuments();
        if (count > 0) {
            console.log(`Found ${count} documents - skipping seed`);
            return;
        }
        await Sneaker.insertMany(sneakerSeedsData);
        console.log(`Seeded ${sneakerSeedsData.length} documents`);

    } catch (error) {
        console.error("Seeding failed:", error);
        throw error;
    }
}