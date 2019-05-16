const express = require('express'); // Add Express Module
const bodyParser = require('body-parser'); // Add Body-Parser Middleware for JSON handling in Requests
const graphqlHttp = require('express-graphql'); // Add Middleware for GraphQL Resolvers over Express HTTP
const mongoose = require('mongoose'); // MongoDB Third-Party package

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const app = express();

app.use(bodyParser.json()); // JSON parsing Middleware added


app.use(isAuth);
app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}-p8e7q.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true`)
    .then( () => {
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    });

