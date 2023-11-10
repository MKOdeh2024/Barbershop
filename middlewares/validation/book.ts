import express from 'express';
import { check, body, validationResult } from 'express-validator';
import { validatorMiddleware } from '../validationMiddleware/validationMiddleware';
import { Salon } from '../../db/entities/Salon';
import dataSource from '../../db/dataSource';
import { Book } from '../../db/entities/Books';


const createBookValidator = [
    check('Date')
        .notEmpty()
        .withMessage('Date required')
        .isDate({format: 'YYYY-MM-DD' })
        .withMessage('Date should be of type date')
        .custom((value) => {
            var ToDate = new Date();
        if (new Date(value).getTime() >= ToDate.getTime()) {
            return true;
        }return false;})
        .withMessage("The Date must not be smaller than today date"),
        
    check('time')
        .notEmpty()
        .withMessage('Time is required')
        .isTime({hourFormat:'hour24'})
        .withMessage("wrong format")
        .custom(async(value, salonId) => {
            var salon =  await Salon.findOneBy({id:Number(salonId)});
            var ToDate = new Date();
            
            if(salon){
                if(new Date(value).getTime() < new Date(salon.startWorkTime).getTime() ||new Date(value).getTime() > new Date(salon.endWorkTime).getTime()){
                    return false;
                }
                return true;
            }
        })
        .withMessage('The time of Book must be during work hours'),
        check('time')
        .custom(async(value, bookId) => {
            var book =  await Book.findOneBy({id:Number(bookId)});
            //var salon = await Salon.findOneBy({book});
            /**if(book){
                if(salon.books.includes(book) ){
                    return false;
                }
                return true;
            }**/
        })
        .withMessage('This time is reserved'),

    validatorMiddleware,
];

const deleteBookValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getBookValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateBookValidator = [
    check('id')
        .notEmpty()
        .withMessage('id required')
        .isNumeric()
        .withMessage("id is a numeric value"),
        check('Date')
        .notEmpty()
        .withMessage('Date required')
        .isDate({format: 'YYYY-MM-DD' })
        .withMessage('Date should be of type date')
        .custom((value) => {
            var ToDate = new Date();
        if (new Date(value).getTime() >= ToDate.getTime()) {
            return true;
        }return false;})
        .withMessage("The Date must not be smaller than today date"),
        
    check('time')
        .notEmpty()
        .withMessage('Duration is required')
        .isTime({hourFormat:'hour24'})
        .withMessage("Duration is a numeric value")
        .custom(async(value, Id) => {
            const salon =  await Salon.findOneBy({id:Number(Id)});
            var ToDate = new Date();
            if(salon){
                if(new Date(value).getTime() < new Date(salon.startWorkTime).getTime() ||new Date(value).getTime() > new Date(salon.endWorkTime).getTime()){
                    return false;
                }return true;
            }
        })
        .withMessage('The time of Book must be during work hours'),

    validatorMiddleware,
];
    export {
        createBookValidator,
        deleteBookValidator,
        getBookValidator,
        updateBookValidator
    }