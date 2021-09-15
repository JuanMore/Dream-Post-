const { red } = require('colors')
const { Router } = require('express')
const express = require('express')
const router = express.Router()
const Article = require('./../models/articles')

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/edit/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article })
})

// removed 'id' and set to slug 
router.get('/:slug', async(req, res) => {
    //find finds an array where as findOne finds one individual article in that array of articles
    const article = await Article.findOne({slug: req.params.slug}) //instead of finById set to find
    if(article == null) res.redirect('/')
    // id of our newly created model - render our page and show article
    res.render('articles/show', {article: article})
})

// pass in 'next'
router.post('/', async(req, res, next) => {
    // save our new artice
    req.article = new Article()
    // call next() to move on to next function 
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async(req, res, next) => {
     // save our new artice
     req.article = await Article.findById(req.params.id)
     // call next() to move on to next function 
     next()
     // redirect back to edit page
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async (req, res) => {
        // create new article
    let article = req.article
        // pass in params from article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
    try {
        //if saved / update article variable with new saved article
       article = await article.save()
       res.redirect(`/articles/${article.slug}`) //route to slug instead of 'id'

    } catch(e) {
        // send user back to new page and prefil all fields 
        res.render(`articles/${path}`, {article: article})
    }
    }
}


module.exports = router