const express = require("express");
const ProductController = require("../controllers/ProductController");
const ProductRouter = express.Router();
const fileUpload = require("express-fileupload");

//read product start

ProductRouter.get(
    "/:id?",
    (req, res) => {

        const result = new ProductController().read(req.params.id, req.query);

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

//read product end

//read single product start

ProductRouter.get(
    "/id/:id",
    (req, res) => {
        const result = new ProductController().readSingleProduct(req.params.id);

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

//read single product end

//create product start

ProductRouter.post(
    "/create",

    fileUpload(
        {
            createParentPath: true,
            useTempFiles: true,   
            tempFileDir: '/tmp/'  
        }
    ),

    (req, res) => {
        console.log(req.files?.main_img, 'image in router');
        const result = new ProductController().create(req.body, req.files?.main_img);

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

//create product end

//changePersentValue start

ProductRouter.patch(
    "/change/:id",
    (req, res) => {
        const result = new ProductController().changePersentValue(req.params.id, req.body.flag);
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

//changePersentValue end

//multiple images start

ProductRouter.post(
    "/multipleimage/:id",

    fileUpload(
        {
            createParentPath: true,
            useTempFiles: true,   
            tempFileDir: '/tmp/'  
        }
    ),

    (req, res) => {
        const result = new ProductController().multipleimage(req.params.id, req.files?.other_img);

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

//multiple images end

//edit product start

ProductRouter.put(
    "/edit/:id",

    fileUpload(
        {
            createParentPath: true,
            useTempFiles: true,   
            tempFileDir: '/tmp/'  
        }
    ),

    (req, res) => {
        const result = new ProductController().editproduct(req.body, req.params.id, req.files?.main_img);

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

//edit product end

//delete product start

ProductRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new ProductController().delete(req.params.id);

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

//delete product start

//fetch Sarees start

ProductRouter.get(
    "/sarees/:id",
    (req, res) => {
        const result = new ProductController().fetchSarees();
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

//fetch Sarees end

//fetch Lehengas start

ProductRouter.get(
    "/lehengas/:id",
    (req, res) => {
        const result = new ProductController().fetchLehengas();
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

//fetch Lehengas end

//fetch Salwar start

ProductRouter.get(
    "/salwar/:id",
    (req, res) => {
        const result = new ProductController().fetchSalwar();
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

//fetch Salwar end

//fetch Salwar start

ProductRouter.get(
    "/new-arrivals/:id",
    (req, res) => {
        const result = new ProductController().fetchNew();
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

//fetch Salwar end

module.exports = ProductRouter;