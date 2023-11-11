import express from 'express';
import { deleteBook, getBook, getBooks, insertBook, updateBook } from '../controllers/Book.js';
import { Book } from '../db/entities/Books.js';
import { createBookValidator, deleteBookValidator, getBookValidator, updateBookValidator } from '../middlewares/validation/book.js';



var router = express.Router();

// Route for creating a new Book request
router.post('/', createBookValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  insertBook(res.locals.employee.id, req.body).then((data) => {
    res.status(201).send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving a specific Book request
router.get('/Book', getBookValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getBook(req.body.id).then((data) => {
    if (data === 1) {
      res.send("Book not found!");
    } else if (data === 0) {
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

// Route for retrieving all Book requests
router.get('/Books', (req, res, next) => {
  getBooks(res.locals.employee.id).then((data) => {
    if (data === null) {
      res.send("there is no Books requests for you");
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

// Route for deleting a Book request
router.delete('/', deleteBookValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  deleteBook(req.body.id).then((data) => {
    if (data === 1) {
      res.send("Book not found");
    } else {
      res.json({ data: data, message: "Book deleted" });
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for updating a Book request
router.put('/', updateBookValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const vac = await Book.findOneBy({ id: req.body.id });
  if (vac) {
    updateBook(req.body.id).then((data) => {
      if (data === 2) {
        res.send("something went wrong, when saving the Book request");
      } else if (data === 1) {
        res.send("Book not found");
      } else if (data) {
        res.send(data);
      } else {
        res.send("something went wrong");
      }
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("Book request not found");
  }
});




  export default router;
