const express = require("express");
const UserController = require("../controllers/UserController");
const UserRouter = express.Router();

//create user start

UserRouter.post(
    "/create",
    (req, res) => {
        const result = new UserController().create(req.body);
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

//create user start

//read user start

UserRouter.get(
    "/:id?",
    (req, res) => {
        const result = new UserController().read(req.params.id);
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

//read user end

//delete user start

UserRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new UserController().delete(req.params.id);

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

//delete user end

//login user start

UserRouter.post(
    "/login",
    (req, res) => {
        const result = new UserController().login(req.body);
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

//login user start

// edit user start

UserRouter.put(
    "/edit",
    (req, res) => {
        const result = new UserController().edit(req.body);
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

// edit user end

// change user password start

UserRouter.put(
    "/change-password",
    (req, res) => {
        const result = new UserController().changePassword(req.body);
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

// change user password end

// add user address start

UserRouter.put(
    "/add-address",
    (req, res) => {
        const result = new UserController().addAddress(req.body);
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

//add user address end

//remove user address start

UserRouter.put(
    "/remove-address",
    (req, res) => {
        const result = new UserController().removeAddress(req.body);
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

//remove user address end

// move to DB admin start 
UserRouter.post(
    '/movetodb/:userId',
    (req, res) => {
        const result = new UserController().moveToDb(req.body, req.params.userId);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
                console.log(error);
            }
        )
    }
)
// move to DB admin end

// add to cart start 
UserRouter.post(
    '/addtocart',
    (req, res) => {
        console.log(req.body, "darta");
        const result = new UserController().addToCart(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
                console.log(error);
            }
        )
    }
)
// add to cart end

// remove from cart start 
UserRouter.post(
    '/removefromcart',
    (req, res) => {
        const result = new UserController().removeFromCart(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
                console.log(error);
            }
        )
    }
)
// remove from cart end

// update cart qty start
UserRouter.post(
    '/updatecartqty',
    (req, res) => {
        const result = new UserController().updateCartQty(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
                console.log(error);
            }
        )
    }
)
// update cart qty end

// update cart size end

UserRouter.patch(
    '/updatesize',
    (req, res) => {
        const result = new UserController().updateSize(req.body);
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

// update cart size end

//add to wishlist start

UserRouter.put(
    '/addtowishlist',
    (req, res) => {
        const result = new UserController().addToWishList(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
                console.log(error);
            }
        )
    }
)

//add to wishlist start




module.exports = UserRouter;