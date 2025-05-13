const ColorModel = require("../models/ColorModel");

class ColorController {

    create(data) {
        return new Promise(
            (resolve, reject) => {
                try {

                    if (data.colorName && data.colorSlug && data.colorCode) {
                        const color = new ColorModel(
                            {
                                ...data
                            }
                        );
                        color.save().then(
                            (success) => {
                                resolve(
                                    {
                                        msg: 'color created successfully',
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                                reject(
                                    {
                                        msg: 'color not created',
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
                    let color;
                    if (id) {
                        color = await ColorModel.findById(id);
                    } else {
                        color = await ColorModel.find();
                    }
                    resolve(
                        {
                            msg: "Color found",
                            status: 1,
                            color
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
                    ColorModel.deleteOne({ _id: id }).then(
                        (success) => {
                            resolve(
                                {
                                    msg: 'Color deleted successfully',
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                            reject(
                                {
                                    msg: 'Color not deleted',
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

    edit(data, id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    ColorModel.updateOne(
                        { _id: id },
                        {
                            $set: {
                                ...data
                            }
                        }
                    ).then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Color updated",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                            reject(
                                {
                                    msg: 'Color not updated',
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

    changeStatus(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const color = await ColorModel.findById(id);
                    ColorModel.updateOne(
                        { _id: id },
                        {
                            $set: {
                                colorStatus: !color.colorStatus
                            }
                        }
                    ).then(
                        (success) => {
                            if (color.colorStatus == false) {
                                resolve(
                                    {
                                        msg: 'Status Activates',
                                        status: 1
                                    }
                                )
                            } else {
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

module.exports = ColorController;