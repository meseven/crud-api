const mongoose = require('mongoose');

module.exports = () => {
  console.log('MongoString:', process.env.MONGODB_STRING);

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
