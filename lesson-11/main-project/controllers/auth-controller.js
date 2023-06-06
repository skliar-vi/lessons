const { ctrlWrapper } = require("../utils")
const { User } = require('../models/user');
const { HttpError, sendEmail, createVerificationEmail } = require("../helpers");
const { SECRET_KEY, BASE_URL, PORT } = process.env;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const fs = require('fs/promises');
const path = require('path')
const { nanoid } = require('nanoid');
const avatarsDir = path.resolve('public', 'avatars')

const register = async (req, res) => {
    const { email, name, password } = req.body;

    const user = await User.findOne({ email })

    if (user) {
        throw HttpError(409, 'User with this email is already exists')
    }
    const avatarUrl = gravatar.url(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid()

    const newUser = await User.create({ email, name, password: hashedPassword, avatarUrl, verificationCode, });

    const verifyEmail = createVerificationEmail(newUser.verificationCode, newUser.email)

    await sendEmail(verifyEmail);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

const verify = async (req, res) => {
    const { verificationCode } = req.params;

    const user = await User.findOne({ verificationCode });

    if (!user) {
        throw HttpError(401)
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: '' })

    res.json({
        message: "Email verified successfully!"
    })
}

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(404);
    }

    if (user.verify) {
        throw Error("Email is already verified")
    }

    const verifyEmail = createVerificationEmail(user.verificationCode, user.email)

    await sendEmail(verifyEmail);

    res.json({
        message: "Email resend successfully"
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        throw HttpError(401, 'Invalid credentials');
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verified")
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
        token,
        user: {
            name: user.name,
            email: user.email,
        }
    })
}

const getCurrent = async (req, res, next) => {
    const { name, email, avatarUrl } = req.user;

    res.json({
        name,
        email,
        avatarUrl,
    })
}

const logout = async (req, res) => {
    const { _id: id } = req.user; ava
    await User.findByIdAndUpdate(id, { token: "" });

    res.json({
        message: "Logout successed",
    })
}

const updateAvatar = async (req, res) => {

    const { path: tempPath, originalname } = req.file;

    const resultDir = path.join(avatarsDir, originalname)
    const { _id } = req.user;

    fs.rename(tempPath, resultDir);
    const avatarUrl = path.join('avatars', originalname);
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({
        avatarUrl,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}