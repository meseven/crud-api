const mongoose = require('mongoose');

require('dotenv').config();

module.exports = () => {
  console.log('process.env', process.env);

  mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });

  mongoose.connection.on('error', (e) => {
    console.log('MongoDB: Not Connected!', e);
  });
};
