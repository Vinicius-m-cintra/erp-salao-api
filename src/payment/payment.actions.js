const Payment = require('./payment.model');

const paymentActions = {
  async savePayment(data) {
    try {
      await Payment.create(data);
      return 'Pagamento registrado com sucesso';
    } catch (error) {
      return error;
    }
  },
};

module.exports = paymentActions;
