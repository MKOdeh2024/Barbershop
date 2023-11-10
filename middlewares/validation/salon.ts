import { check } from 'express-validator';
import { validatorMiddleware } from '../validationMiddleware/validationMiddleware';
const createSalonValidator = [
    check('name')
        .notEmpty()
        .withMessage('Salon name required')
        .isLength({ min: 10})
        .withMessage('Too short Salon name ')
        .isLength({ max: 50})
        .withMessage('Too long name'),
        check('city')
        .notEmpty()
        .withMessage('Salon city required')
        .isLength({ min: 5})
        .withMessage('Too short Salon city ')
        .isLength({ max: 10})
        .withMessage('Too long city name'),
        check('street')
        .notEmpty()
        .withMessage('Salon\'s street required')
        .isLength({ min: 10})
        .withMessage('Too short Salon\'s street name ')
        .isLength({ max: 50})
        .withMessage('Too long Salon\'s street name'),
        check('startWorkTime')
        .notEmpty()
        .withMessage('Salon\'s time required')
        .isTime({hourFormat:'hour24'})
        .withMessage('wrong format'),
        check('endtWorkTime')
        .notEmpty()
        .withMessage('Salon\'s time required')
        .isTime({hourFormat:'hour24'})
        .withMessage('wrong format'),
    
    validatorMiddleware
];

const deleteSalonValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getSalonValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateSalonValidator = [
    check('id')
        .notEmpty()
        .withMessage('id required')
        .isNumeric()
        .withMessage("id is a numeric value"),
        check('name')
        .notEmpty()
        .withMessage('Salon name required')
        .isLength({ min: 10})
        .withMessage('Too short Salon name ')
        .isLength({ max: 50})
        .withMessage('Too long name'),
        check('city')
        .notEmpty()
        .withMessage('Salon city required')
        .isLength({ min: 5})
        .withMessage('Too short Salon city ')
        .isLength({ max: 10})
        .withMessage('Too long city name'),
        check('street')
        .notEmpty()
        .withMessage('Salon\'s street required')
        .isLength({ min: 10})
        .withMessage('Too short Salon\'s street name ')
        .isLength({ max: 50})
        .withMessage('Too long Salon\'s street name'),
        check('startWorkTime')
        .notEmpty()
        .withMessage('Salon\'s time required')
        .isTime({hourFormat:'hour24'})
        .withMessage('wrong format'),
        check('endtWorkTime')
        .notEmpty()
        .withMessage('Salon\'s time required')
        .isTime({hourFormat:'hour24'})
        .withMessage('wrong format'),
    validatorMiddleware,
];
export {
    createSalonValidator,
    deleteSalonValidator,
    getSalonValidator,
    updateSalonValidator
}