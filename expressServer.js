require('dotenv').config()
const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const { default: mongoose } = require('mongoose')
const methodOverride = require('method-override')
const postsRoutes = require('./routes/posts-routes')
const postsApiRoutes = require('./routes/api-posts-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')

const errorMsg = err => chalk.bgKeyword('crimson').bold(err)
const successMsg = msg => chalk.bgKeyword('green').white(msg)

const app = express()

// view ejs also you can use react...
app.set('view engine', 'ejs')

mongoose
    .connect(process.env.MONGO_URL)
    .then(res => console.log(successMsg('Connected to DB')))
    .catch(err => console.log(errorMsg(err)))

app.listen(process.env.PORT, err => {
    console.log(err ? errorMsg(err) : successMsg('listening port 3000'))
})

// ********** midlewars
// morgan - console useful info of requests 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// define what static folders i can use from front
app.use(express.static('styles'))

// advanced parsing fals
app.use(express.urlencoded({ extended: false}))

app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    const title = 'Home'
    // .send for send data
    // .sendFile for send files
    // .render if you use ejs
    res.render(createPath('index'), { title })
})

app.use(postsRoutes);
app.use(postsApiRoutes);
app.use(contactRoutes);


app.get('/about', (req, res) => {
    res.redirect('/contacts')
})

// ! catch errors in the bottom of file(at last)
// middlewar catch request to onexist path
app.use((req, res) => {
    // return error page
    res.status(404)
       .sendFile(createPath('error'))
})