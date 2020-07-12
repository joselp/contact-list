const mongoose = require('mongoose')

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/contact-list';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})