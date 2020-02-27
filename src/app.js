const express = require('express');
const cors = require('cors');

const database = require('./config/database');
const routes = require('./routes');
// const attendanceRoutes = require('./attendance/attendance.routes');
const providerRoutes = require('./provider/provider.routes');
const customerRoutes = require('./customer/customer.routes');
const productRoutes = require('./product/product.routes');

const app = express();

database(process.env.DATABASE);

app.use(cors());

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);

    //  this.express.use(attendanceRoutes);
    this.express.use(customerRoutes);
    this.express.use(providerRoutes);
    this.express.use(productRoutes);
  }
}

module.exports = new AppController();
