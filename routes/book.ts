import express from 'express';
import { deleteBook, getBook, getBooks, insertBook, updateBook } from '../controllers/Book.js';
import { Book } from '../db/entities/Books.js';
import { createBookValidator, deleteBookValidator, getBookValidator, updateBookValidator } from '../middlewares/validation/book.js';
import { Barber } from '../db/entities/Barber.js';
import { Customer } from '../db/entities/Customer.js';



var booksRouter = express.Router();

// Route for creating a new Book request
booksRouter.post('/', createBookValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  insertBook(res.locals.employee.id, req.body).then((data) => {
    res.status(201).send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving a specific Book request
booksRouter.get('/Book', getBookValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
booksRouter.get('/Books', (req, res, next) => {
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
booksRouter.delete('/', deleteBookValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
booksRouter.put('/', updateBookValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const book = await Book.findOneBy({ id: req.body.id });
  if (book) {
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


// granting a book to another user
booksRouter.post('/grant', updateBookValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const senderCustomer = await Customer.findOneBy({ id: req.body.id });
  const bookId = await Book.findOneBy({ id: req.body.bookid });
  if (senderCustomer && bookId) {
      let desicion = prompt(`The user with id ${senderCustomer} wants your book with id ${bookId} : yes/no `);
      if(desicion === "yes"){
        senderCustomer.books.push(bookId);
        res.status(200).send("done");
      }
      else
      res.send("Your request was rejected");    
  } else {
    res.send("Wrong request");
  }
});


  export default booksRouter;
