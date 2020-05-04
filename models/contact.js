const mongoose = require('mongoose')
const validator = require('validator')

var schema = mongoose.Schema({
    owner: {
        type: String,
        trim: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        validate(value) {
            if (!validate.isMobilePhone(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    customData: {
        type: Map
    }
});

/*
schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
*/

const Contact = mongoose.model('Contact', schema)

module.exports = Contact