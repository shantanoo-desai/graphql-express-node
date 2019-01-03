const express = require('express'); // Add Express Module
const bodyParser = require('body-parser'); // Add Body-Parser Middleware for JSON handling in Requests
const graphqlHttp = require('express-graphql'); // Add Middleware for GraphQL Resolvers over Express HTTP
const { buildSchema } = require('graphql'); // Javascript Object-Destructuring (pull objects from packages)

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

app.listen(3000);
