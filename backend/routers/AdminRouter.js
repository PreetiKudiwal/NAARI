const express = require("express");
const AdminController = require("../controllers/AdminController");
const AdminRouter = express.Router();

//create admin start

AdminRouter.post(
    "/create",
    (req, res) => {
        const result = new AdminController().create(req.body);
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

//create admin start

//login admin start

AdminRouter.post(
    "/login",
    (req, res) => {
        const result = new AdminController().login(req.body);
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

//login admin start

//read admin start

AdminRouter.get(
    "/:id?",
    (req, res) => {
        const result = new AdminController().read(req.params.id);

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

//read admin end

//delete admin start

AdminRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new AdminController().delete(req.params.id);

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

//delete admin end

//edit admin start

AdminRouter.put(
    "/edit/:id",
    (req, res) => {
        const result = new AdminController().edit(req.body, req.params.id);
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

//edit admin end



module.exports = AdminRouter;