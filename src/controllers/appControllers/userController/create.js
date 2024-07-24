const bcrypt = require('bcryptjs');
const Joi = require('joi');

const mongoose = require('mongoose');

const authUser = require('./authUser');

const create = async (req, res, { userModel }) => {

    const UserModel = mongoose.model(userModel);
    const { email, password, name } = req.body;

    // validate
    const objectSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
    });

    const { error, value } = objectSchema.validate({ email, password, name });
    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            error: error,
            message: 'Invalid/Missing credentials.',
            errorMessage: error.message,
        });
    }

    var user = await UserModel.findOne({ email });

    if (user)
        return res.status(404).json({
            success: false,
            result: null,
            message: 'Account with this email has already been registered.',
        });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await UserModel.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
    });

    authUser(req, res, { user, password, UserModel });
};

module.exports = create;
