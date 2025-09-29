const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const fileUpload = require("express-fileupload");
const authAdmin = require("../middleware/AuthAdmin");
const CategoryRouter = express.Router();

//create category start

CategoryRouter.post(
    "/create",

    [
        fileUpload(
            {
                createParentPath: true,
                useTempFiles: true,
                tempFileDir: '/tmp/'
            }
        ),
        authAdmin
    ],

    (req, res) => {
        const result = new CategoryController().create(req.body, req.files.categoryImageName);

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

//create category end

//read category start

CategoryRouter.get(
    "/:id?",
    // authAdmin,
    (req, res) => {
        const result = new CategoryController().read(req.params.id);

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

//read category end

//delete category start

CategoryRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new CategoryController().delete(req.params.id);

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

//delete category end

//edit category start

CategoryRouter.put(
    "/edit/:id",
    fileUpload(
        {
            createParentPath: true,
            useTempFiles: true,   
            tempFileDir: '/tmp/'  
        }
    ),
    (req, res) => {
        const result = new CategoryController().edit(req.body, req.params.id, req.files?.categoryImageName);
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

CategoryRouter.patch(
    "/status/:id",
    (req, res) => {
        const result = new CategoryController().changeStatus(req.params.id);
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

module.exports = CategoryRouter;