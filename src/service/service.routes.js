const express = require('express');
const serviceController = require('./service.controller');

const serviceRoute = express.Router()

serviceRoute.post('/service', serviceController.novo);
serviceRoute.get('/service', serviceController.listar);
serviceRoute.get('/service/:id', serviceController.obterUm);
serviceRoute.put('/service/:id', serviceController.atualizar);
serviceRoute.delete('/service/:id', serviceController.excluir);

module.exports = serviceRoute;