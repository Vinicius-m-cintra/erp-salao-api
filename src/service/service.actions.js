const Service = require('./service.model');

const formatResponse = require('../common/formatResponse');

const serviceActions = {
  async saveService(data) {
    try {
      await Service.create(data);
      return 'Serviço cadastrado com sucesso';
    } catch (error) {
      return error;
    }
  },
  async findAll(params) {
    const limit = parseInt(params.limit, {}) || 10;
    const offset = params.offset || 0;

    try {
      const services = await Service.find({
        name: new RegExp(params.name, 'i'),
      })
        .limit(limit)
        .skip(limit * offset);
      return formatResponse(services, { limit, offset });
    } catch (error) {
      return error;
    }
  },
  async findOne(id) {
    try {
      const service = await Service.findById(id);
      return service;
    } catch (error) {
      return error;
    }
  },
  async editService(req) {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body);
      return service;
    } catch (error) {
      return error;
    }
  },
  async deleteService(id) {
    try {
      const service = await Service.findByIdAndDelete(id);
      return service;
    } catch (error) {
      return error;
    }
  },
};

module.exports = serviceActions;
