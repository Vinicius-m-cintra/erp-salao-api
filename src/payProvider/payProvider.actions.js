const PayProvider = require('./payProvider.model');
const Provider = require('../provider/provider.model');

const payProvderActions = {
  savePayment(data) {
    return new Promise((resolve, reject) => {
      Provider.findById(data.provider)
        .then(provider => {
          Provider.findByIdAndUpdate(data.provider, {
            balance: provider.balance + data.total,
          })
            .then(() => {
              PayProvider.create(data)
                .then(() => {
                  return resolve('Pagamento efetuado com sucesso');
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

module.exports = payProvderActions;
