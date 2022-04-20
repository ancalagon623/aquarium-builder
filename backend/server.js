const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { pool } = require('./db');

pool.connect((err) => {
  if (err) console.log(err);
});

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_END_APP,
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const setupDevDatabase = require('./routes/db-setup');

// app.get('/', (req, res) => {
//   res.send('You made it');
// });
app.get('/db-setup', setupDevDatabase);
app.use('/test', routes);

app.listen(process.env.PORT || 8000, () => {
  console.log('Server running on port 8000.');
});
