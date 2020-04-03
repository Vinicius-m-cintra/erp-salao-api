/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const attendanceActions = require('./attendance.actions');
const createResponse = require('../common/createResponse');

const attendanceController = {
  saveAttendance(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        discount: Joi.number().min(0),
        total: Joi.number()
          .min(0)
          .required(),
        paid_value: Joi.number()
          .min(0)
          .required(),
        customer: Joi.string().required(),
        comment: Joi.string(),
        product_service: Joi.array().items(
          Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            value: Joi.number()
              .min(0)
              .required(),
          })
        ),
      });

      const { error } = await schema.validate(data);

      if (error) return reject(createResponse(400, error));

      attendanceActions
        .saveAttendance(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
  findAll(params) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        limit: Joi.number()
          .integer()
          .min(1)
          .max(100),
        offset: Joi.number()
          .integer()
          .min(0),
      });
      const { error } = await schema.validate(params);

      if (error) return reject(createResponse(400, error));
      attendanceActions
        .findAll(params)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
  findOne(id) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const { error } = await schema.validate({ id });
      if (error) return reject(createResponse(400, error));

      attendanceActions
        .findOne(id)
        .then(attendance => {
          if (!attendance) {
            return reject(createResponse(404, 'Fornecedor não encontrado'));
          }
          resolve(createResponse(200, attendance));
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  editAttendance(req) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
        discount: Joi.number().min(0),
        total: Joi.number()
          .min(0)
          .required(),
        paid_value: Joi.number()
          .min(0)
          .required(),
        customer: Joi.string(),
        comment: Joi.string(),
        product_service: Joi.array().items(
          Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            value: Joi.number()
              .min(0)
              .required(),
          })
        ),
      });

      const { error } = await schema.validate({
        ...req.params,
        ...req.body,
      });
      if (error) return reject(createResponse(400, error));

      attendanceActions
        .editAttendance(req)
        .then(attendance => {
          if (attendance) {
            resolve(
              createResponse(200, `Cadastro atendimento alterado com sucesso!`)
            );
          } else {
            resolve(createResponse(404, `Atendimento não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  deleteAttendance(id) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const { error } = schema.validate({ id });
      if (error) return reject(createResponse(400, error));

      attendanceActions
        .deleteAttendance(id)
        .then(attendance => {
          if (attendance) {
            resolve(
              createResponse(
                200,
                `Cadastro de atendimento deletado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Atendimento não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  listAttendances(customer) {
    return new Promise((resolve, reject) => {
      const id = Joi.string().required();

      const { error } = id.validate(customer);
      if (error) return reject(createResponse(500, error));

      attendanceActions
        .listAttendances(customer)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = attendanceController;
