require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
