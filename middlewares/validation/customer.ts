import express from 'express';
import { check, body, validationResult } from 'express-validator';
import { validatorMiddleware } from '../validationMiddleware/validationMiddleware';
const validStatusValues = ['marrid', 'single'];
const validGenderValues = ['male', 'female'];

const createCustomerValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('first name required')
    .isLength({ min: 3 })
    .withMessage('Too short first name')
    .isLength({ max: 32 })
    .withMessage('Too long first name'),
  check('midName')
    .notEmpty()
    .withMessage('mid name required')
    .isLength({ min: 3 })
    .withMessage('Too short mid name')
    .isLength({ max: 32 })
    .withMessage('Too long mid name'),
  check('lastName')
    .notEmpty()
    .withMessage('last ame required')
    .isLength({ min: 3 })
    .withMessage('Too short last name')
    .isLength({ max: 32 })
    .withMessage('Too long last name'),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8, max: 32 })
    .withMessage('Password length should be 8 to 32 characters')
    .custom((value) => {
      var re = /^(?=.*\d)(?=.*[0-9])(?=.*[-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(value);
    })
    .withMessage('The password can only consist of characters that fall within the range of lowercase letters (a-z), uppercase letters (A-Z), digits (0-9), and the hyphen ("-"). '),
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isLength({ min: 3 })
    .withMessage('Too short email')
    .isLength({ max: 32 })
    .withMessage('Too long email')
    .isEmail()
    .withMessage("enter email correctly!"),
  check('phoneNumber')
    .notEmpty()
    .withMessage('phoneNumber is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 10, max: 10 })
    .withMessage('phone number length should be 10 digit number'),
  check('gender')
    .notEmpty()
    .withMessage('gender is required')
    .isIn(validGenderValues)
    .withMessage("status value should be 'male' or 'female' "),
  check('role')
    .notEmpty()
    .withMessage('role is required')
    .isNumeric()
    .withMessage("role is a numeric value"),
  validatorMiddleware,
];
const deleteCustomerValidator = [
  check('id')
    .notEmpty()
    .withMessage('id required')
    .isNumeric()
    .withMessage("id is a numeric value"),
    validatorMiddleware
  ];

const getCustomerValidator = [
  check('id')
    .notEmpty()
    .withMessage('id required')
    .isNumeric()
    .withMessage("id is a numeric value"),
    validatorMiddleware
  ];


const updateCustomerValidator = [
  check('firstName')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short first name')
    .isLength({ max: 32 })
    .withMessage('Too long first name'),
  check('midName')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short mid name')
    .isLength({ max: 32 })
    .withMessage('Too long mid name'),
  check('lastName')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short last name')
    .isLength({ max: 32 })
    .withMessage('Too long last name'),
  check('email')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short email')
    .isLength({ max: 32 })
    .withMessage('Too long email')
    .isEmail()
    .withMessage("enter email correctly!"),
  check('phoneNumber')
    .optional()
    .isNumeric()
    .withMessage("phone number is a numeric value")
    .isLength({ min: 10, max: 10 })
    .withMessage('phone number length should be 10 digit number'),
  validatorMiddleware,
];

  export {
    createCustomerValidator,
    updateCustomerValidator,
    deleteCustomerValidator,
    getCustomerValidator
  }



