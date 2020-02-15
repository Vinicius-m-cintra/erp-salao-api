const Provider = require("./provider.model");

const providerActions = {
  async saveProvider(data) {
    try {
      await Provider.create(data);
      return "Fornecedor cadastrado com sucesso";
    } catch (error) {
      return error;
    }
  }
};

module.exports = providerActions;
