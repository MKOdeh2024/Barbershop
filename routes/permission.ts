import express from 'express';
import {  assignPermission, insertPermission } from '../controllers/permission.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
var permissionsRouter = express.Router();



// Route for creating a new permission
permissionsRouter.post('/permission', (req, res, next) => {
  insertPermission(req.body).then((data) => {
    res.status(201).send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for assigning permissions
permissionsRouter.post('/assignPermission', (req, res, next) => {
  assignPermission(req.body).then((data) => {
    res.status(201).send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});



export default permissionsRouter;

