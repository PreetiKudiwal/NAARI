const { generateUniqueImageName } = require("../helping");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");

class ProductController {

    read(id, query) {
        return new Promise(
            async (resolve, reject) => {
                try {
                 let newQuery = {};   
                if(query.categorySlug != "null") {
                    const category = await CategoryModel.findOne({categorySlug: query.categorySlug});

                    if (!category) {
                        return reject({
                            msg: "Category not found",
                            status: 0
                        });
                    }

                    newQuery.category_id = category._id;
                }

                if(query.productColor != "null") {

                    newQuery.colors = query.productColor;
                }

                    let product;
                    if (id) {
                        product = await ProductModel.findById(id);
                    } else {
                        const limit = parseInt(query.limit);
                        product = await ProductModel.find(newQuery).populate(["category_id", "colors"]).limit(!isNaN(limit) ? limit : 10);
                    }
                    resolve(
                        {
                            msg: "product found",
                            status: 1,
                            product
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

    create(data, file) {
        return new Promise(
            (resolve, reject) => {
                try {
                    const newProductImageName = generateUniqueImageName(file.name);
                    const destination = "./public/images/product/" + newProductImageName;
                    file.mv(
                        destination,
                        (error) => {
                            if (error) {
                                reject(
                                    {
                                        msg: 'product not created due to image upload',
                                        status: 0
                                    }
                                )
                            } else {
                                if (data.name && data.slug) {
                                    const product = new ProductModel(
                                        {
                                            ...data,
                                            colors: JSON.parse(data.colors),
                                            main_img: newProductImageName
                                        }
                                    );
                                    product.save().then(
                                        (success) => {
                                            resolve(
                                                {
                                                    msg: 'product created successfully',
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error)
                                            reject(
                                                {
                                                    msg: 'product not created',
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                                } else {
                                    reject(
                                        {
                                            msg: 'All fields are required',
                                            status: 0
                                        }
                                    )
                                }
                            }
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

    delete(id) {
            return new Promise(
                (resolve, reject) => {
                    try {
                        ProductModel.deleteOne({_id: id}).then(
                            (success) => {
                                resolve(
                                    {
                                        msg: 'Product deleted successfully',
                                        status: 1 
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: 'Product not deleted',
                                        status: 0
                                    }
                                )
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

    changePersentValue(id, flag) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const product = await ProductModel.findById(id);
                    ProductModel.updateOne(
                        { _id: id },
                        {
                            $set: {
                                stock: flag == 1 ? !product.stock : product.stock,
                                status: flag == 2 ? !product.status : product.status,
                                top_selling: flag == 3 ? !product.top_selling : product.top_selling
                            }
                        }
                    ).then(
                        (success) => {
                            resolve(
                                {
                                    msg: 'Status updated successfully',
                                    status: 1
                                }
                            )

                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                            reject(
                                {
                                    msg: 'Status not updated',
                                    status: 0
                                }
                            )
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

    multipleimage(id, allfiles) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const product = await ProductModel.findById(id);

                    if (product) {
                        let currentImages = product.other_img;
                        const allNewFiles = Array.isArray(allfiles) ? allfiles : [allfiles];

                        for (let file of allNewFiles) {
                            const newProductImageName = generateUniqueImageName(file.name);
                            currentImages.push(newProductImageName);
                            const destination = "./public/images/product/" + newProductImageName;
                            file.mv(destination)
                        }

                        ProductModel.updateOne(
                            { _id: id },
                            {
                                $set: {
                                    other_img: currentImages
                                }
                            }
                        ).then(
                            (success) => {
                                resolve(
                                    {
                                        msg: 'Image uploaded successfully',
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: 'Image not uploaded',
                                        status: 0
                                    }
                                )
                            }
                        )
                    } else {
                        reject(
                            {
                                msg: 'Product not founded',
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

    editproduct(data, id, file) {
        console.log(data);
        return new Promise(
            (resolve, reject) => {
                try {
                    if (file) {
                        const newProductImageName = generateUniqueImageName(file.name);
                        const destination = "./public/images/product/" + newProductImageName;
                        file.mv(
                            destination,
                            (error) => {
                                if (error) {
                                    console.log(error);
                                    reject(
                                        {
                                            msg: 'product not updated due to image',
                                            status: 0
                                        }
                                    )
                                } else {
                                    ProductModel.updateOne(
                                        { _id: id },
                                        {
                                            $set: {
                                                ...data,
                                                colors: JSON.parse(data.colors),
                                                main_img: newProductImageName
                                            }
                                        }
                                    ).then(
                                        (success) => {
                                            resolve(
                                                {
                                                    msg: "Product updated",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error);
                                            reject(
                                                {
                                                    msg: 'Product not updated',
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                                }
                            }
                        )
                    } else {
                        ProductModel.updateOne(
                            { _id: id },
                            {
                                $set: {
                                    ...data,
                                    colors: JSON.parse(data.colors)
                                }
                            }
                        ).then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "Product updated",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: 'Product not updated',
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

}

module.exports = ProductController;