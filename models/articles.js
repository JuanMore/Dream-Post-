const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    // pass set of options for each article
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        // set default date of current date
        default: Date.now
    }
})

module.exports = mongoose.model('Article', articleSchema)
