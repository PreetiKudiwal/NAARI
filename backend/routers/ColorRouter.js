const express = require("express");
const ColorController = require("../controllers/ColorController");
const ColorRouter = express.Router();

//create color start

ColorRouter.post(
    "/create",
    (req, res) => {
        const result = new ColorController().create(req.body);
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

//create color start

//read color start

ColorRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ColorController().read(req.params.id);

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

//read color end

//delete color start

ColorRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new ColorController().delete(req.params.id);

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

//delete color end

//edit category start

ColorRouter.put(
    "/edit/:id",
    (req, res) => {
        const result = new ColorController().edit(req.body, req.params.id);
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

//edit category end

//changeStatus start

ColorRouter.patch(
    "/status/:id",
    (req, res) => {
        const result = new ColorController().changeStatus(req.params.id);
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

module.exports = ColorRouter;