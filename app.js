const express = require('express'); // Add Express Module
const bodyParser = require('body-parser'); // Add Body-Parser Middleware for JSON handling in Requests

const app = express();

app.use(bodyParser.json()); // JSON parsing Middleware added

app.get('/', (req, res, next) => {
   res.send('Hello World!');
});

app.listen(3000);
