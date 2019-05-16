const Event = require('../../models/event'); // MongoDB Event Model
const User = require('../../models/user');
const { transformEvent }  = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map( event => {
                return transformEvent(event); // refactor
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
                creator: '5c386195e53f05282804bdd9' // currently hard code ID for User
            });
            let createdEvent;
            const result = await event.save();
            createdEvent = transformEvent(result); // refactor
            const creator = await User.findById('5c386195e53f05282804bdd9'); // find the creator for Event
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
    }
};