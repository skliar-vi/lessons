const { ctrlWrapper } = require("../utils")
const { User } = require('../models/user');
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { email, name, password } = req.body;

    const user = await User.findOne({ email })

    if (user) {
        throw HttpError(409, 'User with this email is already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, name, password: hashedPassword });

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}


const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        throw HttpError(401, 'Invalid credentials');
    }

    const passwordCompareResult = await bcrypt.compare(password, user.password);

    if (!passwordCompareResult) {
        throw HttpError(401, 'Invalid credentials');
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token
    })
}

const getCurrent = async (req, res, next) => {
    const { name, email } = req.user;

    res.json({
        name,
        email,
    })
}

const logout = async (req, res) => {
    const { _id: id } = req.user;
    await User.findByIdAndUpdate(id, { token: "" });

    res.json({
        message: "Logout successed",
    })
}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}