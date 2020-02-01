const express = require('express');
const paymentController = require('./payment.controller');

const paymentRoute = express.Router()

paymentRoute.post('/payment', paymentController.novo);
paymentRoute.get('/payment', paymentController.listar);
paymentRoute.get('/payment/:id', paymentController.obterUm);
paymentRoute.put('/payment/:id', paymentController.atualizar);
paymentRoute.delete('/payment/:id', paymentController.excluir);

module.exports = paymentRoute;