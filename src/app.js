const express = require('express');
var cors = require('cors')
const sequelize = require('./config/sequelize')

var app = express();
app.use(cors())

class AppController {
    constructor() {
        this.express = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require('./routes'))
    }
}

module.exports = new AppController();