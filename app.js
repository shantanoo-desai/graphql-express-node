const express = require('express'); // Add Express Module
const bodyParser = require('body-parser'); // Add Body-Parser Middleware for JSON handling in Requests
const graphqlHttp = require('express-graphql'); // Add Middleware for GraphQL Resolvers over Express HTTP
const { buildSchema } = require('graphql'); // Javascript Object-Destructuring (pull objects from packages)

const app = express();

app.use(bodyParser.json()); // JSON parsing Middleware added

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
        }
        
        type RootMutation {
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {}
}));

app.listen(3000);
