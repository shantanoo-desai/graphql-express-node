const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformEvent, transformBooking } = require('./merge');




module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        }
        catch(err) {
            throw err;
        }
    },
    bookEvent: async (args) => {
        // try {
            const fetchedEvent = await Event.findOne({_id: args.eventId});
            const booking = new Booking({
                user: '5c386195e53f05282804bdd9',
                event: fetchedEvent
            });
            const result = await booking.save();
            return transformBooking(result);
        // } catch (e) {
        //     throw e;
        // }
    },
    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event); // refactor
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        }
        catch (e) {
            throw e;
        }
    }
};