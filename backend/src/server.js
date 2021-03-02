require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRouter');

const PORT = process.env.PORT || 8000;

const app = express();

// Apply middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Add routing
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
