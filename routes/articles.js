const { Router } = require('express')
const express = require('express')
const router = express.Router()
const Article = require('./../models/articles')

router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.get('/:id', (req, res) => {

})

router.post('/', async(req, res) => {
    // create new article
    const article = new Article({
        // pass in params from article
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        //if saved / update article variable with new saved article
       article = await article.save()
       res.redirect(`/articles/${article.id}`)

    } catch(e) {
        // send user back to new page and prefil all fields 
        res.render('articles/new', {article: article})
    }
})


module.exports = router