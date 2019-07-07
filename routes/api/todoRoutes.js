const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");

// /api/todos/all
// get all todos from the signed in user
router.get("/all", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Todo.find({ author: req.user.id }, (err, todos) => {
        res.json(todos);
    });
});

// /api/todos/new
// add new todo, update the user to have todo id
router.post("/new", authMiddleware.isLoggedIn, function (req, res, next) {
    const newTodo = new db.Todo({
        author: req.user._id,
        todo: req.body.todo
    });

    newTodo.save((err, newTodo) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(req.user.id, { $push: { todos: newTodo._id } }, (err, user) => {
            if (err) throw err;
            res.send(newTodo, user);
        });
    });
});

// /api/todos/remove
// removed todo based on id, updates user
router.delete("/remove", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Todo.findByIdAndDelete(req.body.id, (err, todo) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(todo._id, { $pull: { 'todos': todo._id } }, { new: true }, (err, user) => {
            if (err) throw err;
            res.send(user);
        });
    });
});

// /api/todos/update
// update a todo based on id
router.put("/update", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Todo.findByIdAndUpdate(req.body.id, { todo: req.body.todo }, { new: true }, (err, todo) => {
        if (err) throw err;
        res.json(todo);
    });
});

module.exports = router;