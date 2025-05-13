
const { accessToken, encryptPassword, decryptPassword } = require("../helping");
const UserModel = require("../models/UserModel");
const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");


class UserController { 

    create(data) {
        return new Promise(
            async(resolve, reject) => {
                try {

                    const checkEmail = await UserModel.findOne({ email: data.email });

                    if (checkEmail) {
                        reject(
                            {
                                msg: 'Email already exist',
                                status: 0
                            }
                        )
                    }else {

                        const user = new UserModel(
                            {
                                ...data,
                                password: encryptPassword(data.password)
                            }
                        )

                        user.save().then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "User created successfully",
                                        status: 1,
                                        user: {...user.toJSON(), password: null},
                                        token: accessToken(user.toJSON())
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                resolve(
                                    {
                                        msg: "User not created",
                                        status: 0
                                    }
                                )
                            }
                        )
                    }

                    console.log(data)
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


    login(data) {
        return new Promise(
            async(resolve, reject) => {
                try {

                    const user = await UserModel.findOne({ email: data.email });

                    if (user) {

                        if (data.password == decryptPassword(user.password)) {
                            resolve(
                                {
                                    msg: 'Login successfully',
                                    status: 1,
                                    user: {...user.toJSON(), password: null},
                                    token: accessToken(user.toJSON())
                                }
                            )
                        }else {
                            reject(
                                {
                                    msg: 'Password not correct',
                                    status: 0
                                }
                            )
                        }
                        
                    }else {

                        reject(
                            {
                                msg: 'Email not found',
                                status: 0
                            }
                        )
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

    moveToDb(data, userId) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    if (data) {
                        const allPromise = data.map(
                            async (cartItem, cartIndex) => {
                                const existingProduct = await CartModel.findOne({ product_id: cartItem.product_id, user_id: userId }) ?? null;
                                if (existingProduct) {
                                    // update product qty in cart

                                    await CartModel.updateOne(
                                        { _id: existingProduct._id },
                                        {
                                            $inc: {
                                                qty: cartItem.qty
                                            }
                                        }
                                    ).then(
                                        (success) => {
                                            console.log(success);
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error);
                                        }
                                    )


                                } else {
                                    // new product create in cart
                                    await new CartModel(
                                        {
                                            user_id: userId,
                                            product_id: cartItem.product_id._id,
                                            qty: Number(cartItem.qty)
                                        }
                                    ).save().then(
                                        (success) => {
                                            console.log(success);
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error);
                                        }
                                    )
                                }

                            }
                        )
                        await Promise.all(allPromise);

                        const latestCart = await CartModel.find({ user_id: userId }).populate("product_id", "_id original_price finel_price ");

                        resolve(
                            {
                                latestCart: latestCart,
                                msg: "Move to cart successfully",
                                status: 1
                            }
                        )


                    } else {
                        console.log("Cart is empty");
                    }

                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    addToCart(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const existingProduct = await CartModel.findOne({ product_id: data.product_id, user_id: data.user_id });
                    if(existingProduct) {
                        await CartModel.updateOne({ _id: existingProduct._id }, 
                            {
                                $inc: {
                                    qty: 1
                                }
                            }
                        ).then(
                            (success) => {
                                console.log(success);
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                            }
                        )

                    }else {
                        await new CartModel(
                            {
                                user_id: data.user_id,
                                product_id: data.product_id,
                                qty: 1
                            }
                        ).save().then(
                            (success) => {
                                console.log(success);
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                            }
                        )
                    }
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
}

module.exports = UserController;