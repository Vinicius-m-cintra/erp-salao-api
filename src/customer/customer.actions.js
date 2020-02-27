const Customer = require('./customer.model');

const formatResponse = require('../common');

const customerActions = {
  async saveCustomer(data) {
    try {
      await Customer.create(data);
      return 'Cliente cadastrado com sucesso';
    } catch (error) {
      return error;
    }
  },
  async findAll(params) {
    const limit = parseInt(params.limit, {}) || 10;
    const offset = params.offset || 0;

    try {
      const customers = await Customer.find()
        .limit(limit)
        .skip(limit * offset);
      return formatResponse(customers, { limit, offset });
    } catch (error) {
      return error;
    }
  },
  async findOne(id) {
    try {
      const customer = await Customer.findById(id);
      return customer;
    } catch (error) {
      return error;
    }
  },
  async editCustomer(req) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      return customer;
    } catch (error) {
      return error;
    }
  },
  async deleteCustomer(id) {
    try {
      const customer = await Customer.findByIdAndDelete(id);
      return customer;
    } catch (error) {
      return error;
    }
  },
};

module.exports = customerActions;
