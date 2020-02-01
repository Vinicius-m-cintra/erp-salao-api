const express = require('express');
const attendanceController = require('./attendance.controller');

const attendanceRoute = express.Router()

attendanceRoute.post('/attendance', attendanceController.novo);
attendanceRoute.get('/attendance', attendanceController.listar);
attendanceRoute.get('/attendance/:id', attendanceController.obterUm);
attendanceRoute.put('/attendance/:id', attendanceController.atualizar);
attendanceRoute.delete('/attendance/:id', attendanceController.excluir);

module.exports = attendanceRoute;