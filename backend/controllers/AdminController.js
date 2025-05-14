
const { accessToken, encryptPassword, decryptPassword } = require("../helping");
const AdminModel = require("../models/AdminModel");

class AdminController {

    create(data) {
        return new Promise(
            async(resolve, reject) => {
                try {

                    const checkEmail = await AdminModel.findOne({ email: data.email });

                    if (checkEmail) {
                        reject(
                            {
                                msg: 'Email already exist',
                                status: 0
                            }
                        )
                    }else {

                        const admin = new AdminModel(
                            {
                                ...data,
                                password: encryptPassword(data.password)
                            }
                        )

                        admin.save().then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "Admin created successfully",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                resolve(
                                    {
                                        msg: "Admin not created",
                                        status: 0
                                    }
                                )
                            }
                        )
                    }

                    console.log(data)
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


    login(data) {
        return new Promise(
            async(resolve, reject) => {
                try {

                    const admin = await AdminModel.findOne({ email: data.email });

                    if (admin) {

                        if (data.password == decryptPassword(admin.password)) {
                            resolve(
                                {
                                    msg: 'Login successfully',
                                    status: 1,
                                    admin: {...admin.toJSON(), password: null},
                                    token: accessToken(admin.toJSON())
                                }
                            )
                        }else {
                            reject(
                                {
                                    msg: 'Password not correct',
                                    status: 0
                                }
                            )
                        }
                        
                    }else {

                        reject(
                            {
                                msg: 'Email not found',
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
                        let admin;
                        if (id) {
                            admin = await AdminModel.findById(id);
                        } else {
                            admin = await AdminModel.find();
                        }
                        resolve(
                            {
                                msg: "admin found",
                                status: 1,
                                admin
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
                            AdminModel.deleteOne({ _id: id }).then(
                                (success) => {
                                    resolve(
                                        {
                                            msg: 'User deleted successfully',
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
                                AdminModel.updateOne(
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
                                                msg: "User updated",
                                                status: 1
                                            }
                                        )
                                    }
                                ).catch(
                                    (error) => {
                                        console.log(error);
                                        reject(
                                            {
                                                msg: 'User not updated',
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



module.exports = AdminController;