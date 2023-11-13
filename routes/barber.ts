import express from 'express';
import { deleteBarber, getBarber, getBarbers, getPersonalInformation, signUp, updateBarber, } from '../controllers/Barber.js';
import {login} from "../controllers/Barber.js"
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Salon } from '../db/entities/Salon.js';
import { Barber } from '../db/entities/Barber.js';
import {createBarberValidator,updateBarberValidator, deleteBarberValidator, getBarberValidator} from '../middlewares/validation/barber.js'

var barberRouter = express.Router();

// Route for creating an Barber
barberRouter.post('/', createBarberValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const salon = await Salon.findOneBy({ id: req.body.id });
  if (salon) {
    signUp(req.body).then((data) => {
      res.send(data);
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("please enter the salon id correctly!");
  }
});

// Route for retrieving a specific Barber
barberRouter.get('/Barber', getBarberValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getBarber(req.body.id).then((data: any) => {
    res.send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving all Barbers
barberRouter.get('/Barbers', (req, res, next) => {
  getBarbers().then((data) => {
    res.send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for Barber login
barberRouter.post('/login', (req, res) => {
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

// Route for retrieving personal information of the logged-in Barber
barberRouter.get('/personalInfo', (req, res, next) => {
  getPersonalInformation(res.locals.Barber.id).then((Info) => {
    if (Info) {
      res.status(200).json({ Information: Info });
    } else {
      res.send("something went wrong");
    }
  }).catch((err) => {
    res.status(500).send(err.message);
  });
});

// Route for deleting an Barber
barberRouter.delete('/', deleteBarberValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  deleteBarber(req.body.id).then((data) => {
    if (data === 1) {
      res.send("Barber not found");
    } else {
      res.send(data);
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for updating Barber information
barberRouter.put('/', updateBarberValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const emp = await Barber.findOneBy({ id: req.body.id });
  if (emp) {
    updateBarber(req.body).then((data) => {
      // Handle different update scenarios
      // ...
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("Barber not found");
  }
});



export default barberRouter;


