const express = require('express');
var cors = require('cors')

var app = express();
app.use(cors())

class AppController {
    constructor() {
        app = express()
    }

    middlewares() {
        app.use(express.json())
    }

    routes() {
        app.use(require('./routes'))
    }
}

module.exports = new AppController().express;