const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/welcome', (req, res) => res.send('Fish and Chips!'));
app.use('/test', routes);

app.listen(8000, () => {
  console.log('Server running on port 8000.');
});
