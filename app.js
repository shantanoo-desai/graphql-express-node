const express = require('express'); // Add Express Module
const bodyParser = require('body-parser'); // Add Body-Parser Middleware for JSON handling in Requests
const graphqlHttp = require('express-graphql'); // Add Middleware for GraphQL Resolvers over Express HTTP

const app = express();

app.use(bodyParser.json()); // JSON parsing Middleware added

app.use('/graphql', graphqlHttp({
    schema: null,
    rootValue: {}
}));

app.listen(3000);
