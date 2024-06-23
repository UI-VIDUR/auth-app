const authModel = require("../models/auth");
const { encryptPassword, generateToken, verifyPassword } = require("../services/");

async function handleRegister(req, res) {

    try {

        const body = req.body;

        if (!body.fullname || !body.email || !body.password) {
            return res.status(400).json({
                error: 'All fields are required!'
            })
        }

        const isEmailExist = await authModel.findOne({ email: body.email });

        if (isEmailExist) {
            return res.status(400).json({
                error: 'Email already exists!'
            })
        }

        const hashedPassword = await encryptPassword(body.password);
        const user = await authModel.create({
            fullname: body.fullname,
            password: hashedPassword,
            email: body.email
        });

        if (!user) {
            return res.status(400).json({
                error: 'User is not created!'
            })
        }

        const userPayload = {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }

        const token = await generateToken(userPayload);

        return res.status(201).json({
            data: {
                user: userPayload,
                token: token
            }
        });





    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
}

async function handleLogin(req, res) {

    const body = req.body;

    try {

        if (!body.email || !body.password) {

            return res.status(400).json({
                error: 'All fields are required!'
            });
        }
        const user = await authModel.findOne({ email: body.email });

        if (!user) {
            return res.status(400).json({
                error: 'User is not exist'
            })
        }

        const verifyPasswords = await verifyPassword(user.password, body.password);

        if (verifyPasswords) {

            const userPayload = {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            }

            const token = await generateToken(userPayload);

            return res.status(200).json({
                data: {
                    user: userPayload,
                    token: token
                }
            })
        }

        return res.status(400).json({
            error: 'Password not match.'
        })


    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
}


async function handleVerifyAuth(req, res) {
    return res.status(200).json({
        data: req.body
    })
}


async function handleDeleteAll(req, res) {

    try {
        const user = await authModel.deleteMany({});
        if (!user) {
            return res.status(400).json({
                error: 'users not deleted!'
            })
        }

        return res.status(200).json({
            message: 'All users deleted!'
        })

    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
}


module.exports = {
    handleRegister,
    handleLogin,
    handleVerifyAuth,
    handleDeleteAll
}
