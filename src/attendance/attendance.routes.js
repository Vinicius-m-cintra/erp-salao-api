const attendanceRoutes = require("express").Router();

const attendanceController = require("./attendance.controller");

attendanceRoutes.get("/atendimento", async (req, res, next) => {
  let response = await attendanceController
    .consultAttendances()
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

attendanceRoutes.get("/consultaAtendimento", async (req, res, next) => {
  let response = await attendanceController
    .findOneAttendance(req.query.id)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = attendanceRoutes;
