require('dotenv').config();
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const Razorpay = require('razorpay');
const crypto = require('crypto');

var RazorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class OrderController {

    orderPlace(orderData) {
        console.log(orderData, "orderData in orderPlace");
        return new Promise(
            async (resolve, reject) => {
                try {

                    const { user_id, order_total, payment_mode, shipping_details } = orderData;

                    const cartData = await CartModel.find({ user_id }).populate("product_id", "_id name main_img finel_price");
                    const productDetails = cartData.map(
                        (cartItem) => {
                            return {
                                product_id: cartItem.product_id._id,
                                name: cartItem.product_id.name,
                                image: cartItem.product_id.main_img,
                                qty: cartItem.qty,
                                price: cartItem.product_id.finel_price,
                                total: cartItem.product_id.finel_price * cartItem.qty
                            }
                        }
                    )

                    const order = await new OrderModel(
                        {
                            user_id: user_id,
                            product_details: productDetails,
                            order_total: order_total,
                            payment_mode: payment_mode,
                            shipping_details: shipping_details
                        }
                    )

                    order.save().then(
                        (success) => {
                            if (success.payment_mode == 0) {
                                // COD
                                resolve(
                                    {
                                        msg: 'order placed successfully',
                                        status: 1,
                                        order_id: order._id
                                    }
                                )
                            } else {
                                this.intialPaymentGateWay(order._id, order_total).then(
                                    (razorpay_order) => {
                                        resolve(
                                            {
                                                msg: 'order placed successfully',
                                                status: 1,
                                                razorpay_order
                                            }
                                        )
                                    }
                                ).catch(
                                    (error) => {
                                        console.log(error);
                                        reject(
                                            {
                                                msg: 'order not placed',
                                                status: 0
                                            }
                                        )
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


    intialPaymentGateWay(order_id, order_total) {
        console.log(order_id, "order_id in intialPaymentGateWay");
        console.log(order_total, "order_total in intialPaymentGateWay");

        return new Promise(
            (resolve, reject) => {
                try {
                    var options = {
                        amount: order_total * 100, // amount in the smallest currency unit
                        currency: "INR",
                        receipt: order_id,
                    };
                    RazorpayInstance.orders.create(options, async function (err, razorpay_order) {
                        if (err) {
                            console.log(err);
                            reject(
                                {
                                    msg: 'intialPaymentGateWay error',
                                    status: 0
                                }
                            )
                        } else {
                            await OrderModel.updateOne(
                                { _id: order_id },
                                { razorpay_order_id: razorpay_order.id }
                            );
                            console.log(razorpay_order, "razorpay_order in intialPaymentGateWay");
                            resolve(
                                {
                                    msg: 'intialPaymentGateWay success',
                                    status: 1,
                                    order_id,
                                    razorpay_order: razorpay_order.id
                                }
                            )
                        }
                        console.log(razorpay_order);
                    });
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

    paymentSuccess(OrderData) {
        // console.log(OrderData, "paymentData in paymentSuccess");
        return new Promise(
            async (resolve, reject) => {
                try {
                    const { order_id, razorpay_response, user_id } = OrderData;

                    //create data string for signature verification
                    const data = razorpay_response.razorpay_order_id + "|" + razorpay_response.razorpay_payment_id;

                    //Generate HMAC SHA256 signature Using the secret key
                    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                        .update(data)
                        .digest('hex');

                    //Compare the generated signature with the received signature
                    if (generatedSignature === razorpay_response.razorpay_signature) {
                        await CartModel.deleteMany({ user_id });

                        //Fix Query using razorpay_response.razorpay_order_id, NOT order_id
                        await OrderModel.updateOne(
                            { razorpay_order_id: razorpay_response.razorpay_order_id },
                            {
                                razorpay_payment_id: razorpay_response.razorpay_payment_id,
                                order_status: 1, // Assuming 1 means successful
                            }
                        );

                        resolve({ status: 1, msg: 'Payment successful' });
                    } else {
                        reject({ status: 0, msg: 'Payment verification failed' });
                    }
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

   async read(id) {
    try {
        let order;
        if (id) {
            order = await OrderModel.find({ user_id: id });
        } else {
            order = await OrderModel.find();
        }

        return {
            msg: "Orders found",
            status: 1,
            order
        };
    } catch (error) {
        return {
            msg: "Internal server error",
            status: 0
        };
    }
}


}



module.exports = OrderController;