const routes = require('express').Router()

routes.get('/ping', function(req, res) {
    res.send('pong')
})

module.exports = routes;