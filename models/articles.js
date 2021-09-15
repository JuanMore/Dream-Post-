const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createDomPurify = require('dompurify')
// create markdown and turn it into html
const marked = require('marked')
// convert our title into a url friendly slug
const slugify = require('slugify')
const { JSDOM } = require('jsdom')


// allows our dom purify to create html and purify the html
const dompurify = createDomPurify(new JSDOM().window)

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
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

// validations and before attribute
articleSchema.pre('validate', function(next) {
    // create slug from our title
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    // convert our markdown to sanitize.html
    if(this.markdown) {
        // purify that html
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema)
