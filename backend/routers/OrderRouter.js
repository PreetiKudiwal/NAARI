const express = require("express");
const OrderController = require("../controllers/OrderController");
const OrderRouter = express.Router();

//create order start

OrderRouter.post(
    "/order-place",
    (req, res) => {
        const result = new OrderController().orderPlace(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                console.log(error);
                res.send(error);
            }
        )
    }
)

//create order start

module.exports = OrderRouter;