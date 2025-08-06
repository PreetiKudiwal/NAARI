const express = require("express");
const SizeController = require("../controllers/SizeController");
const SizeRouter = express.Router();

//create size start

SizeRouter.post(
    "/create",
    (req, res) => {
        const result = new SizeController().create(req.body);
        result.then(
            (success) =>{
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

//create size end

//read size start

SizeRouter.get(
    "/:id?",
    (req, res) => {
        const result = new SizeController().read(req.params.id);
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

//read size end

//changeStatus start

SizeRouter.patch(
    "/status/:id",
    (req, res) => {
        const result = new SizeController().changeStatus(req.params.id);
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

//changeStatus end

//delete size start

SizeRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new SizeController().delete(req.params.id);

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

//delete size end

//edit size start

SizeRouter.put(
    "/edit/:id",
    (req, res) => {
        const result = new SizeController().edit(req.body, req.params.id);
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

//edit size end

module.exports = SizeRouter;