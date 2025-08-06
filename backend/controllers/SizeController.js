const SizeModel = require("../models/SizeModel");

class SizeController {

    create(data) {
        return new Promise(
            (resolve, reject) => {
                try {

                    if (data.sizeLabel && data.sizeSlug && data.bust && data.waist && data.hip && data.indiaSize && data.intlSize) {
                        const size = new SizeModel(
                            {
                                ...data
                            }
                        );
                        size.save().then(
                            (success) => {
                                resolve(
                                    {
                                        msg: 'size created successfully',
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                                reject(
                                    {
                                        msg: 'size not created',
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

                    let size;
                    if (id) {
                        size = await SizeModel.findById(id);
                    } else {
                        size = await SizeModel.find();
                    }


                    resolve(
                        {
                            msg: "Size found",
                            status: 1,
                            size
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

    changeStatus(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const size = await SizeModel.findById(id);
                    SizeModel.updateOne(
                        { _id: id },
                        {
                            $set: {
                                status: !size.status
                            }
                        }
                    ).then(
                        (success) => {
                            if (size.status == false) {
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

    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    SizeModel.deleteOne({ _id: id }).then(
                        (success) => {
                            resolve(
                                {
                                    msg: 'Size deleted successfully',
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                            reject(
                                {
                                    msg: 'Size not deleted',
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
                    SizeModel.updateOne(
                        { _id: id },
                        {
                            $set: {...data}
                        }
                    ).then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Size updated",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            reject(
                                {
                                    msg: "Size not updated",
                                    status: 0
                                }
                            )
                        }
                    )
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal server error",
                            status:0
                        }
                    )
                }
            }
        )
    }
}

module.exports = SizeController;