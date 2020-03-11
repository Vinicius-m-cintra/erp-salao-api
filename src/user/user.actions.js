/* eslint-disable prefer-promise-reject-errors */
const bcrypt = require('bcrypt');

const User = require('./user.model');

const userActions = {
  register(user) {
    return new Promise((resolve, reject) => {
      User.create(user)
        .then(() => {
          return resolve('Usuário cadastrado com sucesso');
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  login(data) {
    return new Promise(async (resolve, reject) => {
      const { email, password } = data;
      const user = await User.findOne({ email }).select('+password');

      if (!user)
        return reject({ code: 404, message: 'usuario não encontrado' });

      const validate = await bcrypt.compare(password, user.password);
      if (!validate)
        return reject({ code: 400, message: 'Senhas não conferem' });

      return resolve({ token: process.env.TOKEN });
    });
  },
};

module.exports = userActions;
