const express = require ("express")
router = express.Router()

const quantityController = require("../Controller/quantityController")

router.post("/addQuantity", quantityController.createQuantity)


router.get("/getQuantities", quantityController.getQuantities)
router.get("/getQuantity/:id", quantityController.getQuantity)

module.exports = router