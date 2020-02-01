const express = require('express');
const customerController = require('./customer.controller');

const customerRoute = express.Router()

customerRoute.post('/customer', customerController.novo);
customerRoute.get('/customer', customerController.listar);
customerRoute.get('/customer/:id', customerController.obterUm);
customerRoute.put('/customer/:id', customerController.atualizar);
customerRoute.delete('/customer/:id', customerController.excluir);

module.exports = customerRoute;