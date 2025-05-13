
const { generateUniqueImageName } = require("../helping");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
class CategoryController {
    create(data, file) {
        return new Promise(
            (resolve, reject) => {
                try {
                    const newCategoryImageName = generateUniqueImageName(file.name);
                    const destination ="./public/images/category/" + newCategoryImageName;
                    file.mv(
                        destination,
                        (error) => {
                            if (error) {
                                reject(
                                    {
                                        msg: 'category not created due to image upload',
                                        status: 0
                                    }
                                )
                            }else{
                                if (data.categoryName && data.categorySlug) {
                                    const category = new CategoryModel(
                                        {
                                            ...data,
                                            categoryImageName: newCategoryImageName
                                        }
                                    );
                                    category.save().then(
                                        (success) => {
                                            resolve(
                                                {
                                                    msg: 'category created successfully',
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error)
                                            reject(
                                                {
                                                    msg: 'category not created',
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                                }else {
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

    read(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let category;
                    if (id) {
                        category = await CategoryModel.findById(id);

                        resolve (
                            {
                                msg: "Category found",
                                status: 1,
                                category
                            }
                        )
                    }else {
                        category = await CategoryModel.find();

                        const data = [];

                        const allPromise = category.map(
                            async (cat, index) => {
                                const productCount = await ProductModel.find( {category_id: cat._id} ).countDocuments();
                                data.push({...cat.toJSON(), productCount});
                            }
                        )

                        await Promise.all(allPromise);

                        resolve (
                            {
                                msg: "Category found",
                                status: 1,
                                category: data
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

    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    CategoryModel.deleteOne({_id: id}).then(
                        (success) => {
                            resolve(
                                {
                                    msg: 'Category deleted successfully',
                                    status: 1 
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                            reject(
                                {
                                    msg: 'Category not deleted',
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

    edit(data, id , file) {
        return new Promise(
            (resolve, reject) => {
                try {
                    if(file) {
                        const newCategoryImageName = generateUniqueImageName(file.name);
                        const destination ="./public/images/category/" + newCategoryImageName;
                        file.mv(
                            destination,
                            (error) => {
                                if(error) {
                                    console.log(error);
                                    reject(
                                        {
                                            msg: 'Category not updated due to image',
                                            status: 0
                                        }
                                    )
                                }else {
                                    CategoryModel.updateOne(
                                        {_id: id}, 
                                        {
                                            $set: {
                                                categoryName: data.categoryName,
                                                categorySlug: data.categorySlug,
                                                categoryImageName: newCategoryImageName
                                            }
                                        }
                                    ).then(
                                        (success) => {
                                            resolve(
                                                {
                                                    msg: "Category updated",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error);
                                            reject(
                                                {
                                                    msg: 'Category not updated',
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                                }
                            }
                        )
                    }else {
                        CategoryModel.updateOne(
                            {_id: id}, 
                            {
                                $set: {
                                    categoryName: data.categoryName,
                                    categorySlug: data.categorySlug
                                }
                            }
                        ).then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "Category updated",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: 'Category not updated',
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

    changeStatus(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const category = await CategoryModel.findById(id);
                    CategoryModel.updateOne(
                        {_id: id},
                        {
                            $set: {
                                categoryStatus: !category.categoryStatus
                            }
                        }
                    ).then(
                        (success) => {
                            if (category.categoryStatus == false) {
                                resolve(
                                    {
                                        msg: 'Status Activates',
                                        status: 1
                                    }
                                )
                            }else {
                                resolve(
                                    {
                                        msg: 'Status Deactivates',
                                        status: 1
                                    }
                                )
                            }
                            
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
}

module.exports = CategoryController;