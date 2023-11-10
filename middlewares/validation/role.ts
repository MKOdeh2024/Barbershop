import { check } from 'express-validator';
import { validatorMiddleware } from '../validationMiddleware/validationMiddleware';

const createRoleValidator = [
    check('name')
        .notEmpty()
        .withMessage('Role name required')
        .isLength({ min: 4})
        .withMessage('Too short role name ')
        .isLength({ max: 50})
        .withMessage('Too long name'),
    validatorMiddleware
];

const assignRoleValidator = [
    check('role')
        .notEmpty()
        .withMessage('Role name required')
        .isLength({ min: 4})
        .withMessage('Too short role name ')
        .isLength({ max: 50})
        .withMessage('Too long name'),
    check('barberId')
        .notEmpty()
        .withMessage('Barber id required')
        .isNumeric()
        .withMessage("Barber id is a numeric value"),
    check('customerId')
        .notEmpty()
        .withMessage('Customer id required')
        .isNumeric()
        .withMessage("Customer id is a numeric value"),
    
    validatorMiddleware
];

const deleteRoleValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getRoleValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateRoleValidator = [
    check('id')
        .notEmpty()
        .withMessage('id required')
        .isNumeric()
        .withMessage("id is a numeric value"),
    check('name')
        .optional()
        .isLength({ min: 3})
        .withMessage('Too short role name ')
        .isLength({ max: 50})
        .withMessage('Too long name'),
    validatorMiddleware,
];
export {
    createRoleValidator,
    deleteRoleValidator,
    getRoleValidator,
    updateRoleValidator,
    assignRoleValidator
}