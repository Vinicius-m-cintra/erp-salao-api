const express = require('express');
const spentController = require('./spent.controller');

const spentRoute = express.Router()

spentRoute.post('/spent', spentController.novo);
spentRoute.get('/spent', spentController.listar);
spentRoute.get('/spent/:id', spentController.obterUm);
spentRoute.put('/spent/:id', spentController.atualizar);
spentRoute.delete('/spent/:id', spentController.excluir);

module.exports = spentRoute;