const express = require('express');
var cors = require('cors');

const database = require('./config/database');
database(process.env.DATABASE);

var app = express();
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
    this.express.use(require('./routes'));

    this.express.use(require('./attendance/attendance.routes'));
    this.express.use(require('./provider/provider.routes'));
    this.express.use(require('./customer/customer.routes'));
  }
}

module.exports = new AppController();
