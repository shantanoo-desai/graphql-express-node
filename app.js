const express = require('express'); // Add Express Module
const bodyParser = require('body-parser'); // Add Body-Parser Middleware for JSON handling in Requests
const graphqlHttp = require('express-graphql'); // Add Middleware for GraphQL Resolvers over Express HTTP
const { buildSchema } = require('graphql'); // Javascript Object-Destructuring (pull objects from packages)
const mongoose = require('mongoose'); // MongoDB Third-Party package

// dummy in-memory array (temporary)
const events = [];

const app = express();

app.use(bodyParser.json()); // JSON parsing Middleware added

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        type RootQuery {
            events: [Event!]!
        }
        
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            };
            events.push(event);
            return event;

        }
    },
    graphiql: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}-p8e7q.mongodb.net/test?retryWrites=true`)
    .then( () => {
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    });

