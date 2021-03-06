import express from 'express';
import { Model } from 'objection';
import db from './db';

Model.knex(db);

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
