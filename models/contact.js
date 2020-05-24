const mongoose = require('mongoose')
const validator = require('validator')

var schema = mongoose.Schema({
    owner: {
        type: String,
        trim: true
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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, "any")) {
                throw new Error('Phone number is invalid')
            }
        }
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
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

schema.index({ owner: 1, email: 1 }, {
    unique: true,
    partialFilterExpression: {
        'email': { $exists: true }
    }
});

schema.index({ owner: 1, phoneNumber: 1 }, {
    unique: true,
    partialFilterExpression: {
        'phoneNumber': { $exists: true }
    }
});

schema.set('autoIndex', false);

const Contact = mongoose.model('Contact', schema)

Contact.ensureIndexes();

module.exports = Contact