const Payment = require('./payment.model');
const Customer = require('../customer/customer.model');

const paymentActions = {
  async savePayment(data) {
    return new Promise((resolve, reject) => {
      const { customer } = data;
      Customer.findById(customer, { debt: 'debt' })
        .then(debt => {
          Customer.findByIdAndUpdate(customer, { debt: debt.debt - data.value })
            .then(() => {
              Payment.create(data)
                .then(() => {
                  return resolve('Pagamento salvo com sucesso');
                })
                .catch(err => {
                  return reject(err);
                });
            })
            .catch(err => {
              return reject(err);
            });
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

module.exports = paymentActions;
