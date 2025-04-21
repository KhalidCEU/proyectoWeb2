import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser'
import connectDB from './config/database';

const server = express();
const port = process.env.PORT || 8080;

connectDB();

server.use(bodyParser.json())

server.listen(port, () => {
  return console.log(`Server is running on http://localhost:${port}/`);
});
