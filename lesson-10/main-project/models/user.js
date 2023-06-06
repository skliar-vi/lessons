const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    token: {
        type: String,
        default: "",
    },
    avatarUrl: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
})

userShema.post("save", handleMongooseError)

const userRegisterShema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
})

const userLoginShema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
})

const schemas = {
    userRegisterShema,
    userLoginShema,
}

const User = model("user", userShema)

module.exports = {
    User,
    schemas
}