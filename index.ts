import './config.js';
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import  './db/dataSource.js';
//import { authenticate } from './middlewares/auth/authenticate.js';


var app = express();

const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/employees');
/**app.use('/vacations',authenticate,vacationsRouter);
app.use('/advances',authenticate,advancesRouter);
app.use('/sections',authenticate,sectionsRouter);
app.use('/permissions' ,permissionsRouter);
app.use('/advertisements',authenticate,advertisementsRouter);
app.use('/leavePermissions',authenticate,leavePermissionsRouter);
app.use('/roles', rolesRouter);**/


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
 