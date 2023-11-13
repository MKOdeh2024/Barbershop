import './config.js';
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import  './db/dataSource.js';
import { authenticate } from './middlewares/auth/authenticate.js';
import barberRouter from './routes/barber.js';
import customerRouter from './routes/customer.js';
import booksRouter from './routes/book.js';
import permissionsRouter from './routes/permission.js';
import salonsRouter from './routes/salon.js';
import rolesRouter from './routes/role.js';


var app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://Localhost:3000"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/barbers', authenticate,barberRouter );
app.use('/customer',authenticate,customerRouter);
app.use('/books',authenticate,booksRouter);
app.use('/salons',authenticate,salonsRouter);
app.use('/permissions' ,permissionsRouter);
app.use('/roles', rolesRouter);


app.all('*', (req, res, next) => {
  res.status(400).send(`Can't find this route: ${req.originalUrl}`);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

export default app;
 