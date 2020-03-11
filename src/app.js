const express = require('express');
const cors = require('cors');

const database = require('./config/database');
const routes = require('./routes');
const attendanceRoutes = require('./attendance/attendance.routes');
const providerRoutes = require('./provider/provider.routes');
const customerRoutes = require('./customer/customer.routes');
const productRoutes = require('./product/product.routes');
const serviceRoutes = require('./service/service.routes');
const paymentRoutes = require('./payment/payment.routes');
const buysRoutes = require('./buys/buys.routes');
const payProviderRoutes = require('./payProvider/payProvider.routes');
const userRoutes = require('./user/user.routes');
const security = require('./security');

database(process.env.DATABASE);

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors(), (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
      next();
    });
    this.express.use(express.json());
    this.express.use(security);
  }

  routes() {
    this.express.use(routes);
    this.express.use(attendanceRoutes);
    this.express.use(customerRoutes);
    this.express.use(providerRoutes);
    this.express.use(productRoutes);
    this.express.use(serviceRoutes);
    this.express.use(paymentRoutes);
    this.express.use(buysRoutes);
    this.express.use(payProviderRoutes);
    this.express.use(userRoutes);
  }
}

module.exports = new AppController();
