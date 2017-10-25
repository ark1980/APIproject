const server = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/users');

const STATUS_USER_ERROR = 422;
// Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiproject', { useMongoClient: true });

// Routes
server.use('/users', users);


// Error handling function
const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (typeof err === 'string') {
    res.json({ error: err });
  } else {
    res.json(err);
  }
};

const queryAndThen = (query, res, cb) => {
  query.exec((err, result) => {
    if (err) {
      sendUserError(err, res);
    } else {
      cb(result);
    }
  });
};


//Start the Server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is runnig on port ${port}`);
});