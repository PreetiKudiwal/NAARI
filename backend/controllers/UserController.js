
const { accessToken, encryptPassword, decryptPassword } = require("../helping");
const UserModel = require("../models/UserModel");
const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");


class UserController {

    create(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    const checkEmail = await UserModel.findOne({ email: data.email });

                    if (checkEmail) {
                        reject(
                            {
                                msg: 'Email already exist',
                                status: 0
                            }
                        )
                    } else {

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
                                        msg: "Account created successfully",
                                        status: 1,
                                        user: { ...user.toJSON(), password: null },
                                        token: accessToken(user.toJSON())
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                resolve(
                                    {
                                        msg: "Account not created",
                                        status: 0
                                    }
                                )
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


    login(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    const user = await UserModel.findOne({ email: data.email }).populate("wishlist", "name main_img original_price discount_percentage finel_price sizes stock");

                    if (user) {

                        if (data.password == decryptPassword(user.password)) {
                            resolve(
                                {
                                    msg: 'Login successfully',
                                    status: 1,
                                    user: { ...user?.toJSON(), password: null },
                                    token: accessToken(user?.toJSON())
                                }
                            )
                        } else {
                            reject(
                                {
                                    msg: 'Password not correct',
                                    status: 0
                                }
                            )
                        }

                    } else {

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

    edit(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const existingUser = await UserModel.findById(data._id);
                if (!existingUser) {
                    return reject({
                        msg: "User not found",
                        status: 0
                    });
                }

                // Merge existing user with new data
                const updatedUser = {
                    ...existingUser.toObject(),
                    ...data, // override only the fields sent in data
                };

                await UserModel.updateOne(
                    { _id: data._id },
                    { $set: updatedUser }
                );

                resolve({
                    msg: "Profile updated successfully",
                    status: 1,
                    user: { ...updatedUser, password: null }
                });

            } catch (error) {
                console.log(error);
                reject({
                    msg: "Internal Server Error",
                    status: 0
                });
            }
        });
    }

    changePassword(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    const user = await UserModel.findById(data._id);

                    if (user) {

                        if (data.password == decryptPassword(user.password)) {

                            await UserModel.updateOne(
                                { _id: data._id },
                                { $set: { ...data, password: encryptPassword(data.newPassword) } }
                            );
                            resolve(
                                {
                                    msg: 'Password updated successfully',
                                    status: 1,
                                }
                            )
                        } else {
                            reject(
                                {
                                    msg: 'Current Password is not correct',
                                    status: 0
                                }
                            )
                        }

                    } else {

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

    addAddress(data) {

        return new Promise(
            async (resolve, reject) => {
                try {
                    const user = await UserModel.findById(data._id);

                    if (user) {

                        // Check if the user already has 2 addresses
                        if (user.shipping_address && user.shipping_address.length >= 2) {
                            return reject({
                                msg: "Maximum of 2 addresses allowed",
                                status: 0,
                            });
                        }
                        await UserModel.updateOne(
                            { _id: data._id },
                            {
                                $push: {
                                    shipping_address: {
                                        name: data.name,
                                        contact: data.contact,
                                        addressLine1: data.addressLine1,
                                        addressLine2: data.addressLine2,
                                        city: data.city,
                                        state: data.state,
                                        country: data.country,
                                        postalCode: data.postalCode
                                    }
                                }
                            }
                        );

                        const updatedUser = await UserModel.findById(data._id);
                        resolve(
                            {
                                msg: "Address saved",
                                status: 1,
                                user: { ...updatedUser._doc, password: null }
                            }
                        )
                    } else {
                        reject(
                            {
                                msg: "User not found",
                                status: 0,
                            }
                        )
                    }
                } catch (error) {
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    removeAddress(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    const user = await UserModel.findById(data._id);

                    if (!user) {
                        return reject(
                            {
                                msg: "User not found",
                                status: 0
                            }
                        )
                    }

                    //chackes the index is valid

                    if (
                        typeof data.index !== "number" ||
                        data.index < 0 ||
                        data.index >= user.shipping_address.length
                    ) {
                        return reject({
                            msg: "Invalid address index",
                            status: 0,
                        });
                    }

                    user.shipping_address.splice(data.index, 1);
                    await user.save();

                    resolve(
                        {
                            msg: "Address removed",
                            status: 1,
                            user: { ...user._doc, password: null }
                        }
                    )

                } catch (error) {
                    console.log(error)
                    reject(
                        {
                            msg: "Internal server error",
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
                                const existingProduct = await CartModel.findOne({ product_id: cartItem.product_id._id, user_id: userId, size: cartItem.size }) ?? null;
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
                                            qty: Number(cartItem.qty),
                                            size: cartItem.size,
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

                        const latestCart = await CartModel.find({ user_id: userId }).populate("product_id", "_id original_price finel_price sizes main_img name stock discount_percentage");

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
                    const existingProduct = await CartModel.findOne({ product_id: data.product_id, user_id: data.user_id, size: data.size });
                    if (existingProduct) {
                        await CartModel.updateOne({ _id: existingProduct._id },
                            {
                                $inc: {
                                    qty: 1
                                }
                            }
                        ).then(
                            (success) => {
                                console.log(success);
                                resolve(
                                    {
                                        msg: 'Product added to cart',
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: 'Failed to add product',
                                        status: 0
                                    }
                                )
                            }
                        )

                    } else {
                        await new CartModel(
                            {
                                user_id: data.user_id,
                                product_id: data.product_id,
                                size: data.size,
                                qty: 1
                            }
                        ).save().then(
                            (success) => {
                                console.log(success);
                                resolve({
                                    msg: "Product added to cart",
                                    status: 1
                                });
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject({
                                    msg: "Failed to add product",
                                    status: 0
                                });
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

    removeFromCart(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const existingProduct = await CartModel.findOne({
                    product_id: data.product_id,
                    user_id: data.user_id,
                    size: data.size
                });

                if (existingProduct) {
                    const result = await CartModel.deleteOne({ _id: existingProduct._id });

                    resolve({
                        msg: "Product removed successfully",
                        status: 1
                    });

                } else {
                    // Important: handle case when product doesn't exist
                    resolve({
                        msg: "Product not found in cart",
                        status: 0
                    });
                }
            } catch (error) {
                console.log(error);
                reject({
                    msg: "Internal Server error",
                    status: 0
                });
            }
        });
    }

    updateCartQty(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const existingProduct = await CartModel.findOne({ product_id: data.product_id, user_id: data.user_id, size: data.size });

                    if (existingProduct) {
                        let newQty = parseInt(data.qty);
                        if (isNaN(newQty)) newQty = 1; // default
                        if (newQty < 1) newQty = 1;
                        if (newQty > 5) newQty = 5;
                        await CartModel.updateOne(
                            { _id: existingProduct._id },
                            {
                                $set: {
                                    qty: newQty
                                }
                            }
                        ).then(
                            (success) => {
                                console.log(success);
                                resolve(
                                    {
                                        msg: "Cart updated successfully",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: "Failed to update cart",
                                        status: 0
                                    }
                                )
                            }
                        )
                    } else {
                        reject(
                            {
                                msg: "Product not found in cart",
                                status: 0
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

    updateSize(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    const existingProduct = await CartModel.findOne({ product_id: data.product_id, user_id: data.user_id, size: data.oldSize });
                    if (existingProduct) {
                        await CartModel.updateOne(
                            { _id: existingProduct._id },
                            {
                                $set: {
                                    size: data.newSize
                                }
                            }
                        ).then(
                            (success) => {
                                resolve(
                                    {
                                        msg: 'Size updated successfully',
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: 'Size not updated',
                                        status: 0
                                    }
                                )
                            }
                        )
                    } else {
                        reject(
                            {
                                msg: 'Product not found in cart',
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

    addToWishList(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const { user_id, product_id } = data;
                    if (!user_id || !product_id) {
                        return reject({
                            msg: 'Missing user_id or product_id',
                            status: 0
                        });
                    }

                    let user = await UserModel.findById(user_id);

                    if (!user) {
                        return reject({
                            msg: 'User not found',
                            status: 0
                        });
                    }

                    if (user.wishlist.some(id => id.toString() === product_id.toString())) {
                        // remove product from wishlist
                        user.wishlist = user.wishlist.filter(
                            id => id.toString() !== product_id.toString()
                        );
                        await user.save();
                    } else {
                        // add product to wishlist
                        user.wishlist.push(product_id);
                        await user.save();
                    }

                    // Populate wishlist with product details
                    const populatedUser = await UserModel.findById(user_id).populate("wishlist", "name main_img original_price discount_percentage finel_price sizes stock discount_percentage").lean();

                    return resolve({
                        msg: user.wishlist.some(id => id.toString() === product_id.toString())
                            ? 'Product added to wishlist'
                            : 'Product removed from wishlist',
                        status: 1,
                        user: { ...populatedUser, password: null }
                    });

                } catch (error) {
                    console.log(error);
                    reject({
                        msg: 'Internal server error',
                        status: 0
                    });
                }
            }
        );
    }

}



module.exports = UserController;