const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isLink = require('validator/lib/isURL');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (link) => isLink(link),
        message: 'Некорректный адрес',
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Невалидный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toObject: {
      useProjection: true,
    },
  },
);

module.exports = mongoose.model('user', userSchema);
