const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
      type: String,
      unique: true,
      required: [true, "username is required"]
  },
  password: {
      type: String,
      unique: false,
      validate: {
        validator: function(v) {
          //min 4 characters, one letter, one number, 4 digits
          return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,})/.text(v);
          //original, i think it's lower, upper letters, number, and 8 digits
          // return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v);
        },
        message: props => `${props.value} is not a valid password`
      },
      required: [true, "password is required"]
  },
  admin: {
    type: Boolean,
    unique: false,
    required: true,
    default: false
},
  createdAt: {
      type: Date,
      default: Date.now()
  }
});

usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

usersSchema.methods.validPassword = function(password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
}

const User = mongoose.model("User", usersSchema);

module.exports = User;
