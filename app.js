const dotenv = require('dotenv')
dotenv.config({
    path: __dirname + '/.env'
});
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Article = require('./models/articles')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/DreamPost'
// const path = require('path')
// 'mongodb://localhost:27017/DreamPost'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))
app.use(methodOverride('_method')) //override the method


// allows us to access our diff params from articles form inside out route

app.get('/', async (req, res) => {
    // init variable to = our article reqs
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    // pass our articles to index by passing object to our render
    res.render('articles/index', {
        articles: articles
    })
})

app.use('/articles', articleRouter)


app.listen(process.env.PORT || 3000)

console.log(dbUrl);