const express = require('express');
const providerController = require('./provider.controller');

const providerRoute = express.Router()

providerRoute.post('/provider', providerController.novo);
providerRoute.get('/provider', providerController.listar);
providerRoute.get('/provider/:id', providerController.obterUm);
providerRoute.put('/provider/:id', providerController.atualizar);
providerRoute.delete('/provider/:id', providerController.excluir);

module.exports = providerRoute;