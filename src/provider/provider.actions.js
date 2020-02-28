const Provider = require('./provider.model');

const formatResponse = require('../common/formatResponse');

const providerActions = {
  async saveProvider(data) {
    try {
      await Provider.create(data);
      return 'Fornecedor cadastrado com sucesso';
    } catch (error) {
      return error;
    }
  },
  async findAll(params) {
    const limit = parseInt(params.limit, {}) || 10;
    const offset = params.offset || 0;

    try {
      const providers = await Provider.find({
        name: new RegExp(params.name, 'i'),
      })
        .limit(limit)
        .skip(limit * offset);
      return formatResponse(providers, { limit, offset });
    } catch (error) {
      return error;
    }
  },
  async findOne(id) {
    try {
      const provider = await Provider.findById(id);
      return provider;
    } catch (error) {
      return error;
    }
  },
  async editProvider(req) {
    try {
      const provider = await Provider.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      return provider;
    } catch (error) {
      return error;
    }
  },
  async deleteProvider(id) {
    try {
      const provider = await Provider.findByIdAndDelete(id);
      return provider;
    } catch (error) {
      return error;
    }
  },
};

module.exports = providerActions;
