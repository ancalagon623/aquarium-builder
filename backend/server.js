const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./db');

pool.connect((err) => {
  if (err) console.log(err);
});

const app = express();

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes');
const setupDevDatabase = require('./routes/db-setup');

app.get('/', (req, res) => {
  res.send('You made it');
});
app.post('/db-setup', setupDevDatabase);
app.use('/api', routes);

app.listen(process.env.PORT || 8000, () => {
  console.log('Server running on port 8000.');
});
