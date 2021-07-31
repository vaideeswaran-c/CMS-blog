const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Admin = require('./models/admin')
const Article = require('./models/article')
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '10mb',
    extended: true
}))
app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(bodyParser.json({ limit: "10mb" }))

app.use(express.static('assets'))

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html')
})

app.get('/login', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/login.html')
})

app.get('/new', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/new.html')
})

app.get('/blog/:slug', async (req, res) => {
    console.log(__dirname)
    try {
        const article = await Article.findOne({
            slug: req.params.slug
        })
        res.send(JSON.stringify({ article: article }))
    } catch (e) {
        console.log(e)
        res.send(JSON.stringify({ error: "Error in finding article" }))
    }
})

app.get('/article/:slug', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/article.html')
})

app.get('/edit/:slug', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/edit.html')
})

app.get('/editblog/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({
            slug: req.params.slug
        })
        res.send(JSON.stringify({ article: article }))
    } catch (e) {
        console.log(e)
        res.send(JSON.stringify({ error: "Error in finding article" }))
    }
})

app.post('/upload', async (req, res) => {
    let article = new Article()
    article.title = req.body.title;
    article.description = req.body.description
    article.image = req.body.image
    try {
        article = await article.save()
        res.send(JSON.stringify({ message: "Success" }))
    } catch (e) {
        console.log(e)
        res.send(JSON.stringify({ error: "Error in register as admin" }))
    }
})

app.post('/update', async (req, res) => {
    Article.findById(req.body.id, function (err, article) {
        if (!article) {
            res.send(JSON.stringify({ error: "Error in finding article" }))
        }
        else {
            article.title = req.body.title
            article.description = req.body.description
            article.image = req.body.image
            article.createdAt = Date.now()
            article.save(function (err) {
                if (err)
                    console.log('error')
                else
                    console.log('success')
            });
            res.send(JSON.stringify({ message: "Success" }))
        }
    });
})

app.get('/delete/:slug', async (req, res) => {
    const query = {
        slug: req.params.slug
    }
    try {
        await Article.deleteOne(query);
        res.sendFile(__dirname + '/index.html')
    } catch (e) {
        console.log(e)
        res.sendFile(__dirname + '/index.html')
    }

})

app.get('/all', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: 'desc' })
        res.send(JSON.stringify({ articles: articles }))
    } catch (e) {
        console.log(e)
        res.send(JSON.stringify({ error: "Error in fetching articles" }))
    }
})

app.get('/admin', async (req, res) => {
    try {
        console.log(req.query)
        const admin = await Admin.findOne({
            email: req.query.email,
            password: req.query.password
        })
        console.log(admin, req.params)
        if (admin == null) {
            res.send(JSON.stringify({ error: "Invalid email and password" }))
        } else {
            res.send(JSON.stringify({ message: "success", path: "/" }))
        }
    } catch (e) {
        console.log(e)
    }
})

app.get("/register", async (req, res) => {
    let admin = new Admin()
    admin.email = req.query.email
    admin.password = req.query.password
    console.log(admin, req.query)
    try {
        admin = await admin.save()
        res.send(JSON.stringify({ message: "Success" }))
    } catch (e) {
        console.log(e)
        res.send(JSON.stringify({ error: "Error in register as admin" }))
    }
})

app.listen(3000)