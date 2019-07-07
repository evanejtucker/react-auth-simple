const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todosSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  todo: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Todo = mongoose.model("Todo", todosSchema);

module.exports = Todo;
