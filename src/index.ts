import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser'
import connectDB from './config/database';
import router from './router';
import cors from 'cors';

import { fetchAndSaveCurrencies, startCurrencyScheduler } from './controllers/currency';

const server = express();
const port = process.env.PORT || 8080;

connectDB();

server.use(cors())
server.use(bodyParser.json())

server.use('/api', router)

server.listen(port, () => {
  return console.log(`Server is running on http://localhost:${port}/`);
});

// Start currency data fetch scheduler
startCurrencyScheduler();
