const Attendance = require('./attendance.model');
const Customer = require('../customer/customer.model');

const formatResponse = require('../common/formatResponse');

const attendanceActions = {
  async saveAttendance(data) {
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
  async findAll(params) {
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
  async findOne(id) {
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
  async editAttendance(req) {
    return new Promise((resolve, reject) => {
      Attendance.findByIdAndUpdate(req.params.id, req.body).then(attendance => {
        return resolve(attendance).catch(err => {
          return reject(err);
        });
      });
    });
  },
  async deleteAttendance(id) {
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
};

module.exports = attendanceActions;
