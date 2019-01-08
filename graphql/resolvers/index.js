const bcrypt = require('bcryptjs'); // password hashing
const Event = require('../../models/event'); // MongoDB Event Model
const User = require('../../models/user'); // MongoDB User Model

const user = async userId => {
    try {
    const user = await User.findById(userId);
    return { ...user._doc,
            _id: user.id,
            password: null,
            createdEvents: events.bind(this, user._doc.createdEvents)
    };
    }
    catch(err){
            throw err;
    }
};

const events = async eventIds => {
    try {
        const events = await Event.find({_id: {$in: eventIds}});
        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
        });
    }
    catch(err) {
        throw err;
    }
};

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map( event => {
                     return { ...event._doc,
                        _id: event.id,
                        date: new Date(event._doc.date).toISOString(),
                        creator: user.bind(this, event.creator)
                    };
            });
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    },
    createEvent: async (args) => {
        try {
                const event = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: '5c351af454866410fc910a35' // currently hard code ID for User
                });
                let createdEvent;
                const result = await event.save();
                createdEvent ={
                            ...result._doc,
                            _id: result._doc._id.toString(),
                            date: new Date(result._doc.date).toISOString(),
                            creator: user.bind(this, result.creator) };
                const creator = await User.findById('5c34e068de64d30724ba6a1b'); // find the creator for Event
                if (!creator) { // if user already exists
                            throw new Error('No User Found');
                }
                creator.createdEvents.push(event); // add the respective event to the createdEvents Array
                await creator.save();
                return createdEvent;
        }
        catch(err) {
                console.log(err);
                throw err;
        }
    },
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email});
            if (existingUser) {
                throw new Error('User Exists Already');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();
            return {...result._doc, password: null, _id: result.id};
        }
        catch (e) {
            throw e;
        }
    }
};