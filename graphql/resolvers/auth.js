const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {singleCart} = require('./merge');

module.exports = {

    createUser(args) {
        const email = args.userInput.email;
        const password = args.userInput.password;
        const firstname = args.userInput.firstname;
        const lastname = args.userInput.lastname;
        const confirmPassword = args.userInput.confirmPassword;
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return User.findOne({email: email}).then(existingUser => {
            if (existingUser) {
                throw new Error('User Already Exists');
            }
            if (confirmPassword !== password) {
                throw new Error('Passwords do not match');
            }
            if (!re.test(email)) {
                throw new Error('Email is not valid');
            }
            return bcrypt.hash(password, 12).then(hashedPass => {
                const user = new User({
                    email: email,
                    password: hashedPass,
                    firstname: firstname,
                    lastname: lastname,
                    createdMobiles: [],
                    cart: [],
                    orders: []
                });
                return user.save().then(result => {
                    return {
                        ...result._doc,
                        _id: result._doc._id.toString(),
                        password: null,
                        cart: singleCart.bind(this, result._doc.cart)
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
        })
    },

    loginUser: (args) => {
        const email = args.email;
        const password = args.password;
        return User.findOne({email: email}).then(user => {
            if (!user) {
                throw new Error('User can not Be Found');
            }
            if (password.length < 6) {
                throw new Error('Invalid Password');
            }
            return bcrypt.compare(password, user.password).then(doMatch => {
                if (!doMatch) {
                    throw new Error('Invalid Email or Password');
                }
                const token = jwt.sign({
                    userId: user._id,
                    email: user.email
                }, process.env.JWT_SECRET,
                {expiresIn: '1h'});
                return {
                    token: token,
                    userId: user._id,
                    tokenExpiration: 1,
                    firstname: user.firstname
                };
            });
        });
    }

};