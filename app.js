const express = require('express'); // Add Express Module
const bodyParser = require('body-parser'); // Add Body-Parser Middleware for JSON handling in Requests
const graphqlHttp = require('express-graphql'); // Add Middleware for GraphQL Resolvers over Express HTTP
const { buildSchema } = require('graphql'); // Javascript Object-Destructuring (pull objects from packages)
const mongoose = require('mongoose'); // MongoDB Third-Party package
const bcrypt = require('bcryptjs'); // password hashing

const Event = require('./models/event'); // MongoDB Event Model
const User = require('./models/user'); // MongoDB User Model
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
        
        type User {
            _id: ID!
            email: String!,
            password: String
        }
        
        input UserInput {
            email: String!
            password: String!
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
            createUser(userInput: UserInput): User
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
                .then(events => {
                    return events.map( event => {
                        event._doc._id = event.id;
                        // return event._doc;
                        return { ...event._doc, _id: event.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                })
        },
        createEvent: (args) => {
            const event = new Event({
               title: args.eventInput.title,
               description: args.eventInput.description,
               price: +args.eventInput.price,
               date: new Date(args.eventInput.date),
                creator: '5c34e068de64d30724ba6a1b' // currently hard code ID for User
            });
            let createdEvent;
            return event
                .save()
                .then(result => {
                    createdEvent ={ ...result._doc, _id: result._doc._id.toString() };
                    return User.findById('5c34e068de64d30724ba6a1b'); // find the creator for Event
                    // return result._doc
                })
                .then(user => { // user Promise
                    if (!user) { // if user already exists
                        throw new Error('No User Found');
                    }
                    user.createdEvents.push(event); // add the respective event to the createdEvents Array
                    return user.save();
                })
                .then(result => { // result returned for `user`.save and not for `event`.save()
                    return createdEvent;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });

        },
        createUser: (args) => {
            return User.findOne({ email: args.userInput.email})
                .then(user => {
                    if(user) {
                        throw new Error('User Exists Already');
                    }
                    return bcrypt.hash(args.userInput.password, 12)
                        .then(hashedPassword => {
                            const user = new User({
                                email: args.userInput.email,
                                password: hashedPassword
                            });
                            return user.save()
                                .then(result => {
                                    return {...result._doc, password: null, _id: result.id};
                                })
                                .catch(err => {
                                    throw err;
                                })
                        })
                        .catch(err => {
                            throw err;
                        });
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    graphiql: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}-p8e7q.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true`)
    .then( () => {
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    });

