// Validations Helper
const { body } = require("express-validator");
const { check } = require("express-validator");

exports.validRegister = [
    check("name", "Name is required")
        .not()
        .isEmpty()
        .isLength({
            min: 4,
            max: 32,
        })
        .withMessage("name must be between 3 to 32 character"),

    check("email").not().isEmpty().withMessage("Must be a valid email address"),
    check("password")
        .isLength({
            min: 6,
        })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number"),
];

exports.validUpdate = [
    check("name", "Name is required")
        .not()
        .isEmpty()
        .isLength({
            min: 4,
            max: 32,
        })
        .withMessage("name must be between 3 to 32 character"),

    check("email").not().isEmpty().withMessage("Must be a valid email address"),
    body('oldPassword')
        // if the new password is provided...
        .if((value, { req }) => req.body.newPassword)
        // OR
        .if(body('newPassword').exists())
        // ...then the old password must be too...
        .notEmpty()
        .withMessage("Old password must supply with new password")
        // ...and they must not be equal.
        .custom((value, { req }) => value !== req.body.newPassword)
        .withMessage("New password must different from old password"),
];

exports.validLogin = [
    check("email").not().isEmpty().withMessage("Must be a valid email address"),
    check("password")
        .isLength({
            min: 6,
        })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number"),
];

exports.forgotPasswordValidator = [
    check("email")
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Must be a valid email address"),
];

exports.resetPasswordValidator = [
    check("newPassword")
        .not()
        .isEmpty()
        .isLength({
            min: 6,
        })
        .withMessage("Must be a valid email address"),
];