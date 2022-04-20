const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const corsOptions = {
  origin: process.env.FRONT_END_APP,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('You made it');
});
app.get('/welcome', (req, res) => res.send('Fish and Chips!'));
app.use('/test', routes);

app.listen(8000, () => {
  console.log('Server running on port 8000.');
});
