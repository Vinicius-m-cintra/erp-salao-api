const Product = require('./product.model');

const formatResponse = require('../common/formatResponse');

const productActions = {
  async saveProduct(data) {
    try {
      await Product.create(data);
      return 'Produto cadastrado com sucesso';
    } catch (error) {
      return error;
    }
  },
  async findAll(params) {
    const limit = parseInt(params.limit, {}) || 10;
    const offset = params.offset || 0;

    try {
      const products = await Product.find({
        name: new RegExp(params.name, 'i'),
      })
        .limit(limit)
        .skip(limit * offset)
        .populate('provider');
      return formatResponse(products, { limit, offset });
    } catch (error) {
      return error;
    }
  },
  async findOne(id) {
    try {
      const product = await Product.findById(id).populate('provider');
      return product;
    } catch (error) {
      return error;
    }
  },
  async editProduct(req) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body);
      return product;
    } catch (error) {
      return error;
    }
  },
  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      return product;
    } catch (error) {
      return error;
    }
  },
};

module.exports = productActions;
