const bcrypt = require('bcryptjs'); // password hashing
const User = require('../../models/user'); // MongoDB User Model
const jwt = require('jsonwebtoken');

module.exports = {
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
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if(!user) {
            throw new  Error('User does not Exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            throw new Error('Invalid Credentials');
        }

        const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey',
            {expiresIn: '1h'});

        return {userId: user.id, token: token, tokenExpiration: 1};
    }
};