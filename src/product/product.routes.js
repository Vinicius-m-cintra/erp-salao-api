const express = require('express');
const productController = require('./product.controller');

const productRoute = express.Router()

productRoute.post('/product', productController.novo);
productRoute.get('/product', productController.listar);
productRoute.get('/product/:id', productController.obterUm);
productRoute.put('/product/:id', productController.atualizar);
productRoute.delete('/product/:id', productController.excluir);

module.exports = productRoute;