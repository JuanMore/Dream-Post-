const express = require('express')
const mongoose = require('mongoose')
const app = express()
const articleRouter = require('./routes/articles')
// const path = require('path')

mongoose.connect('mongodb://localhost:27017/WriteNow', {
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


// allows us to access our diff params from articles form inside out route

app.get('/', (req, res) => {
    // init variable to = our article reqs
    const articles = [ {
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    }]
    // pass our articles to index by passing object to our render
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)


app.listen(3000, () => {
    console.log('Listening on port 3000')
})