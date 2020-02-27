const mongoose = require('mongoose');

module.exports = app => {
  mongoose.connect(app, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);

  mongoose.connection.on('connected', () => {
    // eslint-disable-next-line no-console
    console.log(`* Mongoose! conectado a ${app}`);
  });

  mongoose.connection.on('disconnected', () => {
    // eslint-disable-next-line no-console
    console.log(`* Mongoose! desconectado de ${app}`);
  });

  mongoose.connection.on('error', error => {
    // eslint-disable-next-line no-console
    console.log(`* Mongoose! ERRO: ${error}`);
  });

  // Capturamos um sinal de encerramento (SIGINT), Ctrl+C
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      // eslint-disable-next-line no-console
      console.log('* Mongoose! Desconectado pelo término da aplicação');
      // 0 indica que a finalização ocorreu sem erros
      process.exit(0);
    });
  });
};
