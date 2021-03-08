import express from 'express';
import { Model } from 'objection';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import db from './db';
import errorMiddleware from './middleware/errorMiddleware';
import switchRouter from './routes/switchRoutes';
import matchRouter from './routes/matchRoutes';

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
app.use(errorMiddleware);

// Routers and routes
app.use('/switches', switchRouter);
app.use('/matches', matchRouter);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
