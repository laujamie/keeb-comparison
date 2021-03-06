import express from 'express';
import { Model } from 'objection';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import db from './db';

Model.knex(db);

// Config variables
const app = express();
const PORT = process.env.PORT || 8000;

// Set up gkobal app middleware
const corsConfig = {
  origin: [process.env.CLIENT_URL || 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

// Routers and routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
