const router = require("express").Router();
const userRoutes = require("./userRoutes");
const todoRoutes = require("./todoRoutes");

router.use("/users", userRoutes);
router.use("/todos", todoRoutes);

module.exports = router;
