const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { db } = require('../database/db');
const { transfersRouter } = require('../routes/transfer.routes');
const { usersRouter } = require('../routes/user.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(cors());

    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.transfers, transfersRouter);
    this.app.use(this.paths.users, usersRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('server is running on port', this.port);
    });
  }
}

module.exports = Server;
