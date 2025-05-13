const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");

class OrderController {

    orderPlace(orderData) {
        return new Promise(
            async(resolve, reject) => {
                try {
                    const cartData = await CartModel.find({user_id: orderData._id}).populate("product_id", "_id finel_price");
                    const productDetails = cartData.map(
                        (cartItem) => {
                            return{
                                product_id: cartItem.product_id._id,
                                qty: cartItem.qty,
                                price: cartItem.product_id.finel_price,
                                total: cartItem.product_id.finel_price * cartItem.qty
                            }
                        }
                    )

                    const order = await new OrderModel(
                        {
                            user_id: orderData.user_id,
                            product_details: productDetails,
                            order_total: orderData.order_total,
                            payment_mode: orderData.payment_mode,
                            shipping_details: orderData.shipping_details
                        }
                    )

                    order.save().then(
                        (success) => {
                            if (success.payment_mode == 0) {
                                resolve(
                                    {
                                        msg: 'order placed successfully',
                                        status: 1
                                    }
                                )
                            }else {
                                this.intialPaymentGateWay(user_id, order_total).then(
                                    () => {

                                    }
                                ).catch(
                                    () => {

                                    }
                                )
                            }
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                        }
                    )

                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: 'Internal server error',
                            status: 0
                        }
                    )
                }
            }
        )
    }


    intialPaymentGateWay(user_id, order_total) {

        return new Promise(
            (resolve, reject) => {
                try {
                    
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: 'Internal server error',
                            status: 0
                        }
                    )
                }
            }
        )
    }

}



module.exports = OrderController;