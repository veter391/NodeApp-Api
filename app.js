const http = require('node:http')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const PORT = 3000
const myError = err => chalk.bold.red(err)


const server = http.createServer((req, res) => {
    console.log('Server request')

    res.setHeader('Content-type', 'text/html')

    const createPath = page => path.resolve(__dirname, 'views', `${page}.html`)


    // *server routing
    // change path from switch case
    let basePatn = ''
    //  check urls and path to files
    switch( req.url ) {
        // multiply links to home page
        case '/': 
        case '/home': 
        case '/index.html': 
            basePatn = createPath('index')
            res.statusCode = 200
            break;
        case '/about':
            res.statusCode = 301
            // redirect to page /contacts
            res.setHeader('Location', '/contacts')
            // end and close the connection
            res.end()
            break;
        case '/contacts': 
            basePatn = createPath('contacts')
            res.statusCode = 200
            break;
        default : 
            basePatn = createPath('error')
            res.statusCode = 404
            break;
    }

    //  check url
    // if ( req.url = '/') {
        fs.readFile(basePatn, (err, data) => {
            if ( err ) {
                console.log(myError(err))
                // if server error
                res.statusCode = 500
            } else {
                res.write(data)
            }

            // ! server always have to close the connection!!
            res.end()
        })
    // } 

})

server.listen(PORT, 'localhost', err => {
    console.log(err ? myError(err) : 'listening port 3000')
})