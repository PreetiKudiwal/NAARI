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

//read order start

OrderRouter.get(
    "/:user_id?",
    (req, res) => {
        const result = new OrderController().read(req.params.user_id);

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

//read order end

//payment success start

OrderRouter.post(
    "/payment-success",
    (req, res) => {
        const result = new OrderController().paymentSuccess(req.body);
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

//payment success end

module.exports = OrderRouter;