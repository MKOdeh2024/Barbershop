import express from 'express';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { deleteSalon, getSalon, getSalons, insertSalon, updateSalon } from '../controllers/Salon.js';
import { createSalonValidator, deleteSalonValidator, getSalonValidator, updateSalonValidator } from '../middlewares/validation/salon.js';
import { Salon } from '../db/entities/Salon.js';

var router = express.Router();

// Route for creating a new Salon
router.post('/', createSalonValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  insertSalon(req.body).then((data) => {
    res.send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving a specific Salon
router.get('/Salon', getSalonValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
getSalon(req.body.name).then((data) => {
  if (data === null) {
    res.send("Salon not found!");
  } else if (data === undefined) {
    res.send("something went wrong");
  } else {
    res.send(data);
  }
}).catch(err => {
  console.log("here");
  console.error(err);
  res.status(500).send(err);
});
});

// Route for retrieving all Salons
router.get('/Salons', (req: express.Request, res: express.Response, next: express.NextFunction) => {
getSalons().then((data) => {
  if (data === null) {
    res.send("there is no Salon");
  } else if (data === undefined) {
    res.send("something went wrong");
  } else {
    res.send(data);
  }
}).catch(err => {
  console.error(err);
  res.status(500).send(err);
});
});

// Route for deleting a Salon
router.delete('/', deleteSalonValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
deleteSalon(req.body.id).then((data) => {
   if (data === undefined) {
    res.send("Salon not found");
  } else {
    res.json({ data: data, message: "Salon deleted" });
  }
}).catch(err => {
  console.error(err);
  res.status(500).send(err);
});
});

// Route for updating a Salon
router.put('/', updateSalonValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
updateSalon(req.body).then((data) => {
  if (data === 2) {
    res.send("something went wrong, when updating Salon");
  } else if (data === 1) {
    res.send("Salon not found");
  } else if (data) {
    res.send(data);
  } else {
    res.send("something went wrong");
  }
}).catch(err => {
  console.error(err);
  res.status(500).send(err);
});
});








export default router;
