const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: {
    type: String,
    required: [true, '`{PATH}` field is required.'],
    minLength: [3, '`{PATH}` en az ({VALUE}) ({MINLENGTH}) karakter girilebilir.'],
    maxLength: [30, '`{PATH}` en fazla ({VALUE}) ({MAXLENGTH}) karakter girilebilir.'],
  },
  description: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 500,
  },
  year: {
    type: Number,
    max: 2021,
    min: 1500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('book', BookSchema);
