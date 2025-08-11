const express = require("express");
const router = express.Router();
const pizzaController = require("../controllers/pizzacontrolers");

router.get("/", pizzaController.getpizza);
router.post("/", pizzaController.createpizza);

module.exports = router;
