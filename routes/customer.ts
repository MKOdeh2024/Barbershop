import express from 'express';
import { deleteCustomer, getCustomer, getCustomers, signUp, updateCustomer, } from '../controllers/Customer.js';
import {login} from "../controllers/Customer.js"
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Salon } from '../db/entities/Salon.js';
import { Customer } from '../db/entities/Customer.js';
import {createCustomerValidator,updateCustomerValidator, deleteCustomerValidator, getCustomerValidator} from '../middlewares/validation/customer.js'

var router = express.Router();

// Route for creating an Customer
router.post('/', createCustomerValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    signUp(req.body).then((data) => {
      res.send(data);
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });

});

// Route for retrieving a specific Customer
router.get('/Customer', getCustomerValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getCustomer(req.body.id).then((data: any) => {
    res.send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving all Customers
router.get('/Customers', (req, res, next) => {
  getCustomers().then((data) => {
    res.send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for Customer login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  login(email, password)
    .then(data => {
      res.json({ token: data });
    })
    .catch(err => {
      res.status(401).send(err);
    });
});



// Route for deleting an Customer
router.delete('/', deleteCustomerValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  deleteCustomer(req.body.id).then((data) => {
    if (data === 1) {
      res.send("Customer not found");
    } else {
      res.send(data);
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for updating Customer information
router.put('/', updateCustomerValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const emp = await Customer.findOneBy({ id: req.body.id });
  if (emp) {
    updateCustomer(req.body).then((data) => {
      // Handle different update scenarios
      // ...
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("Customer not found");
  }
});



export default router;


