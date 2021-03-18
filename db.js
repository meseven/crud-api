const mongoose = require('mongoose');

require('dotenv').config();

module.exports = () => {
  mongoose.connect(
    'mongodb+srv://root:123456ff@cluster0.mlcqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  );

  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });

  mongoose.connection.on('error', (e) => {
    console.log('MongoDB: Not Connected!', e);
  });
};
