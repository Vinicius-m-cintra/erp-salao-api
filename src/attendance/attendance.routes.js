const attendanceRoutes = require('express').Router();

const attendanceController = require('./attendance.controller');

attendanceRoutes.post('/attendance', async (req, res, next) => {
  const response = await attendanceController
    .saveAttendance(req.body)
    .then(attendance => {
      return attendance;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

attendanceRoutes.get('/attendance', async (req, res, next) => {
  const response = await attendanceController
    .findAll(req.query)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

attendanceRoutes.get('/attendance/:id', async (req, res, next) => {
  const response = await attendanceController
    .findOne(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

attendanceRoutes.patch('/attendance/:id', async (req, res, next) => {
  const response = await attendanceController
    .editAttendance(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

attendanceRoutes.delete('/attendance/:id', async (req, res, next) => {
  const response = await attendanceController
    .deleteAttendance(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

attendanceRoutes.get('/attendances', async (req, res, next) => {
  const response = await attendanceController
    .listAttendances(req.query.customer)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = attendanceRoutes;
