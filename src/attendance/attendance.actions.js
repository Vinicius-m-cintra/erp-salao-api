const moment = require('moment');
const Attendance = require('./attendance.model');
const Customer = require('../customer/customer.model');
const Payment = require('../payment/payment.model');

const formatResponse = require('../common/formatResponse');

const attendanceActions = {
  saveAttendance(data) {
    return new Promise((resolve, reject) => {
      const { customer } = data;
      Customer.findById(customer, { debt: 'debt' }).then(debt => {
        Customer.findByIdAndUpdate(customer, {
          debt: debt.debt + (data.total - data.paid_value),
        })
          .then(() => {
            Attendance.create(data)
              .then(() => {
                return resolve('Atendimento cadastrado com sucesso');
              })
              .catch(err => {
                return reject(err);
              });
          })
          .catch(err => {
            return reject(err);
          });
      });
    });
  },
  findAll(params) {
    return new Promise((resolve, reject) => {
      const limit = parseInt(params.limit, {}) || 10;
      const offset = params.offset || 0;

      Attendance.find()
        .populate('customer')
        .limit(limit)
        .skip(limit * offset)
        .then(attendances => {
          return resolve(formatResponse(attendances, { limit, offset }));
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  findOne(id) {
    return new Promise((resolve, reject) => {
      Attendance.findById(id)
        .then(attendance => {
          return resolve(attendance);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  editAttendance(req) {
    return new Promise((resolve, reject) => {
      Attendance.findByIdAndUpdate(req.params.id, req.body).then(attendance => {
        return resolve(attendance).catch(err => {
          return reject(err);
        });
      });
    });
  },
  deleteAttendance(id) {
    return new Promise((resolve, reject) => {
      Attendance.findByIdAndDelete(id)
        .then(attendance => {
          return resolve(attendance);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  listAttendances(customer) {
    return new Promise((resolve, reject) => {
      const term = moment().subtract(3, 'months');
      const today = moment().startOf('day');
      const response = {};
      Attendance.find(
        {
          customer,
          createdAt: {
            $gte: term.toDate(),
            $lte: moment(today)
              .endOf('day')
              .toDate(),
          },
        },
        {
          total: 'total',
          paid_value: 'paid_value',
          product_service: 'product_service',
          createdAt: 'createdAt',
        },
        {
          sort: {
            createdAt: -1,
          },
        }
      ).then(attendances => {
        response.attendances = attendances;
        Payment.find(
          {
            customer,
            createdAt: {
              $gte: term.toDate(),
              $lte: moment(today)
                .endOf('day')
                .toDate(),
            },
          },
          {
            description: 'description',
            value: 'value',
            createdAt: 'createdAt',
          },
          {
            sort: {
              createdAt: -1,
            },
          }
        )
          .then(payments => {
            response.payments = payments;
            return resolve(response);
          })
          .catch(err => {
            return reject(err);
          });
      });
    });
  },
};

module.exports = attendanceActions;
