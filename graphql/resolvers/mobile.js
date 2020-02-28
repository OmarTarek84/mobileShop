const Mobile = require('../../models/mobile');
const User = require('../../models/user');
const {transformMobile} = require('./merge');
const io = require('../../socket');

module.exports = {

    createMobile: (args, req, context) => {
        const title = args.mobileInput.title;
        const description = args.mobileInput.description;
        const price = +args.mobileInput.price;
        const model = args.mobileInput.model;
        const image = args.mobileInput.imageUrl;

        if (!title || !description || !price || !image) {
            throw new Error('Please Fill all the required Fields');
        }
        // if (!req.isAuth) {
        //     throw new Error('UnAuthorized');
        // }

        const newMobile = new Mobile({
            title: title,
            description: description,
            price: price,
            model: model,
            imageUrl: image,
            userId: req.userId
        });

        return newMobile.save().then(result => {
            return User.findById(req.userId).then(user => {
                io.getIO().emit('newMobile', {mobile: {
                    ...result._doc,
                    userId: {
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }
                }});
                user.createdMobiles.push(result);
                return user.save().then(res => {
                    return transformMobile(result);
                });
            });
        })
        .catch(err => {
            throw new Error(err);
        });
    },

    mobiles: (args, req, context) => {
        return Mobile.find().then(mobiles => {
            return mobiles.map(mobile => {
                return transformMobile(mobile);
            });
        })
        .catch(err => {
            throw new Error('Error in Fetching Mobiles');
        });
    },

    editMobile: (args, req) => {
        const mobileId = args.mobileId;
        const title = args.newMobile.title;
        const description = args.newMobile.description;
        const price = +args.newMobile.price;
        const model = args.newMobile.model;
        const imageUrl = args.newMobile.imageUrl;
        return Mobile.findOne({_id: mobileId}).then(mobile => {
            if (!mobile) {
                throw new Error('Not Authorized');
            }
            mobile.title = title;
            mobile.description = description;
            mobile.price = price;
            mobile.model = model;
            mobile.imageUrl = imageUrl;
            return mobile.save().then(result => {
                return User.findById(req.userId).then(user => {
                    io.getIO().emit('editedMobile', {mobile: {
                        ...result._doc,
                        userId: {
                            _id: user._id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email
                        }
                    }})
                    return transformMobile(result);
                })
            });
        });
    }
};