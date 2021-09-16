const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Article = require('./models/articles')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

// const path = require('path')

mongoose.connect('mongodb+srv://Moreno-Dev:<Shade-Dev99>@cluster0.6apug.mongodb.net/DreamPost', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method')) //override the method


// allows us to access our diff params from articles form inside out route

app.get('/', async(req, res) => {
    // init variable to = our article reqs
    const articles = await Article.find().sort({ createdAt: 'desc'})
    // pass our articles to index by passing object to our render
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)


app.listen(process.env.PORT || 3000)
