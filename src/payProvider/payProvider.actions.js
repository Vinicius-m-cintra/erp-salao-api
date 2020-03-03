const PayProvider = require('./payProvider.model');
const Provider = require('../provider/provider.model');

const payProvderActions = {
  async savePayment(data) {
    const { balance } = await Provider.findById(data.provider);
    await Provider.findByIdAndUpdate(data.provider, {
      balance: balance + data.total,
    })
      .then(async () => {
        await PayProvider.create(data)
          .then(() => {
            return 'Pagamento efetuado com sucesso';
          })
          .catch(err => {
            return err;
          });
      })
      .catch(err => {
        return err;
      });
  },
};

module.exports = payProvderActions;
