const { generateUniqueImageName } = require("../helping");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const SizeModel = require("../models/SizeModel");
const cloudinary = require("../config/Cloudinary"); // Cloudinary config
const fs = require("fs");

class ProductController {

    read(id, query) {
        console.log(query, 'query');
        return new Promise(
            async (resolve, reject) => {
                try {
                    let newQuery = {};
                    if (query.categorySlug != "null") {
                        const category = await CategoryModel.findOne({ categorySlug: query.categorySlug });

                        if (!category) {
                            return reject({
                                msg: "Category not found",
                                status: 0
                            });
                        }

                        newQuery.category_id = category._id;
                    }

                    if (query.productColor != "null") {

                        newQuery.colors = query.productColor;
                    }
                    
                    if (query.size && query.size !== "null") {
                        const sizeDoc = await SizeModel.findOne({ sizeSlug: query.size });

                        if (!sizeDoc) {
                            return reject({
                                msg: "Size not found",
                                status: 0
                            });
                        }

                        newQuery.sizes = sizeDoc._id;
                    }


                    if (query.priceFrom || query.priceTo) {
                        newQuery.finel_price = {};

                        if (query.priceFrom && !isNaN(parseInt(query.priceFrom))) {
                            newQuery.finel_price.$gte = parseInt(query.priceFrom);
                        }

                        if (query.priceTo && !isNaN(parseInt(query.priceTo))) {
                            newQuery.finel_price.$lte = parseInt(query.priceTo);
                        }

                        // Remove empty object if both were invalid
                        if (Object.keys(newQuery.finel_price).length === 0) {
                            delete newQuery.finel_price;
                        }
                    }



                    let product;
                    if (id) {
                        product = await ProductModel.findById(id).populate(["category_id", "colors"]);
                    } else {
                        const limit = parseInt(query.limit);
                        product = await ProductModel.find(newQuery).populate(["category_id", "colors"]).limit(!isNaN(limit) ? limit : 100);
                    }
                    // let product;
                    // if (id) {
                    //     product = await ProductModel.findById(id).populate(["category_id", "colors"]);
                    // } else {
                    //     product = await ProductModel.find().populate(["category_id", "colors"]).limit(query.limit);
                    // }
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

    readSingleProduct(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    if (!id) {
                        return reject(
                            {
                                msg: "Product not found",
                                status: 0
                            }
                        )
                    }

                    const single_product = await ProductModel.findById(id).populate(["category_id", "colors"]);

                    if (!single_product) {
                        return reject({
                            msg: "Product not found",
                            status: 0
                        });
                    }

                    resolve(
                        {
                            msg: "Product found",
                            status: 1,
                            single_product
                        }
                    )
                } catch (error) {
                    console.log(error);
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

    // create(data, file) {
    //     return new Promise(
    //         (resolve, reject) => {
    //             try {
    //                 const newProductImageName = generateUniqueImageName(file.name);
    //                 const destination = "./public/images/product/" + newProductImageName;
    //                 file.mv(
    //                     destination,
    //                     (error) => {
    //                         if (error) {
    //                             reject(
    //                                 {
    //                                     msg: 'product not created due to image upload',
    //                                     status: 0
    //                                 }
    //                             )
    //                         } else {
    //                             if (data.name && data.slug) {
    //                                 const product = new ProductModel(
    //                                     {
    //                                         ...data,
    //                                         colors: JSON.parse(data.colors),
    //                                         sizes: JSON.parse(data.sizes),
    //                                         main_img: newProductImageName
    //                                     }
    //                                 );
    //                                 product.save().then(
    //                                     (success) => {
    //                                         resolve(
    //                                             {
    //                                                 msg: 'product created successfully',
    //                                                 status: 1
    //                                             }
    //                                         )
    //                                     }
    //                                 ).catch(
    //                                     (error) => {
    //                                         console.log(error)
    //                                         reject(
    //                                             {
    //                                                 msg: 'product not created',
    //                                                 status: 0
    //                                             }
    //                                         )
    //                                     }
    //                                 )
    //                             } else {
    //                                 reject(
    //                                     {
    //                                         msg: 'All fields are required',
    //                                         status: 0
    //                                     }
    //                                 )
    //                             }
    //                         }
    //                     }
    //                 )


    //             } catch (error) {
    //                 console.log(error);
    //                 reject(
    //                     {
    //                         msg: 'Internal server error',
    //                         status: 0
    //                     }
    //                 )
    //             }

    //         }
    //     )
    // }

    create(data, file) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.slug) {
                return reject({ msg: "All fields are required", status: 0 });
            }

            let main_img_url = null;

            if (file) {
                // Cloudinary upload
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "shop_images/product", // folder name
                });

                main_img_url = result.secure_url;

                // Temp file delete
                fs.unlinkSync(file.tempFilePath);
            }

            const product = new ProductModel({
                ...data,
                colors: JSON.parse(data.colors),
                sizes: JSON.parse(data.sizes),
                main_img: main_img_url, // Cloudinary URL save
            });

            product.save()
                .then(success => {
                    resolve({ msg: "Product created successfully", status: 1 });
                })
                .catch(error => {
                    console.log(error);
                    reject({ msg: "Product not created", status: 0 });
                });

        } catch (error) {
            console.log(error);
            reject({ msg: "Internal server error", status: 0 });
        }
    });
}

    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    ProductModel.deleteOne({ _id: id }).then(
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
                            // const newProductImageName = generateUniqueImageName(file.name);
                            // currentImages.push(newProductImageName);
                            // const destination = "./public/images/product/" + newProductImageName;
                            // file.mv(destination)
                        // Cloudinary upload
                        const result = await cloudinary.uploader.upload(file.tempFilePath, {
                            folder: 'shop_images/product', // optional folder
                        });

                        currentImages.push(result.secure_url); // Cloudinary URL MongoDB me save karenge
                    }

                        await ProductModel.updateOne(
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

    // editproduct(data, id, file) {
    //     return new Promise(
    //         (resolve, reject) => {
    //             try {
    //                 if (file) {
    //                     const newProductImageName = generateUniqueImageName(file.name);
    //                     const destination = "./public/images/product/" + newProductImageName;
    //                     file.mv(
    //                         destination,
    //                         (error) => {
    //                             if (error) {
    //                                 console.log(error);
    //                                 reject(
    //                                     {
    //                                         msg: 'product not updated due to image',
    //                                         status: 0
    //                                     }
    //                                 )
    //                             } else {
    //                                 ProductModel.updateOne(
    //                                     { _id: id },
    //                                     {
    //                                         $set: {
    //                                             ...data,
    //                                             colors: JSON.parse(data.colors),
    //                                             sizes: JSON.parse(data.sizes),
    //                                             main_img: newProductImageName
    //                                         }
    //                                     }
    //                                 ).then(
    //                                     (success) => {
    //                                         resolve(
    //                                             {
    //                                                 msg: "Product updated",
    //                                                 status: 1
    //                                             }
    //                                         )
    //                                     }
    //                                 ).catch(
    //                                     (error) => {
    //                                         console.log(error);
    //                                         reject(
    //                                             {
    //                                                 msg: 'Product not updated',
    //                                                 status: 0
    //                                             }
    //                                         )
    //                                     }
    //                                 )
    //                             }
    //                         }
    //                     )
    //                 } else {
    //                     ProductModel.updateOne(
    //                         { _id: id },
    //                         {
    //                             $set: {
    //                                 ...data,
    //                                 colors: JSON.parse(data.colors),
    //                                 sizes: JSON.parse(data.sizes)
    //                             }
    //                         }
    //                     ).then(
    //                         (success) => {
    //                             resolve(
    //                                 {
    //                                     msg: "Product updated",
    //                                     status: 1
    //                                 }
    //                             )
    //                         }
    //                     ).catch(
    //                         (error) => {
    //                             console.log(error);
    //                             reject(
    //                                 {
    //                                     msg: 'Product not updated',
    //                                     status: 0
    //                                 }
    //                             )
    //                         }
    //                     )
    //                 }

    //             } catch (error) {
    //                 console.log(error);
    //                 reject(
    //                     {
    //                         msg: 'Internal server error',
    //                         status: 0
    //                     }
    //                 )
    //             }
    //         }
    //     )
    // }

    editproduct(data, id, file) {
    return new Promise(
        async (resolve, reject) => {
            try {
                const updateData = {
                    ...data,
                    colors: JSON.parse(data.colors),
                    sizes: JSON.parse(data.sizes)
                };

                if (file) {
                    // Cloudinary upload
                    const result = await cloudinary.uploader.upload(file.tempFilePath, {
                        folder: 'shop_images/product',
                    });
                    updateData.main_img = result.secure_url; // Cloudinary URL save karenge
                }

                await ProductModel.updateOne(
                    { _id: id },
                    { $set: updateData }
                );

                resolve({
                    msg: "Product updated successfully",
                    status: 1
                });

            } catch (error) {
                console.log(error);
                reject({
                    msg: 'Product not updated',
                    status: 0
                });
            }
        }
    )
}

    fetchSarees() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const result = await ProductModel.find({ category_id: "68a850320d5f3fb09771adab" }).limit(8);
                    if (!result) {
                        return reject(
                            {
                                msg: "No sarees found",
                                status: 0
                            }
                        )
                    }

                    resolve(
                        {
                            msg: "Sarees found",
                            status: 1,
                            sarees: result
                        }
                    )
                } catch (error) {
                    console.log(error);
                    resolve(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }

            }
        )
    }
    
    fetchLehengas() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const result = await ProductModel.find({ category_id: "68a84e680d5f3fb09771ada7" }).limit(8);
                    if (!result) {
                        return reject(
                            {
                                msg: "No lehengas found",
                                status: 0
                            }
                        )
                    }

                    resolve(
                        {
                            msg: "lehengas found",
                            status: 1,
                            lehengas: result
                        }
                    )
                } catch (error) {
                    console.log(error);
                    resolve(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }

            }
        )
    }

    fetchSalwar() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const result = await ProductModel.find({ category_id: "68a851640d5f3fb09771aded" }).limit(8);
                    if (!result) {
                        return reject(
                            {
                                msg: "No salwar found",
                                status: 0
                            }
                        )
                    }

                    resolve(
                        {
                            msg: "salwar found",
                            status: 1,
                            salwar: result
                        }
                    )
                } catch (error) {
                    console.log(error);
                    resolve(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }

            }
        )
    }

     fetchNew() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const result = await ProductModel.find().sort({ createdAt: -1 })
                    .limit(8);
                    if (!result || result.length === 0) {
                        return reject(
                            {
                                msg: "No products found",
                                status: 0
                            }
                        )
                    }

                    resolve(
                        {
                            msg: "products found",
                            status: 1,
                            items: result
                        }
                    )
                } catch (error) {
                    console.log(error);
                    resolve(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }

            }
        )
    }
}
        

module.exports = ProductController;