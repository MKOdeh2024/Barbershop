import express from 'express';
import { Customer } from '../../db/entities/Customer';
import { CUSTOMER } from '../../@types/Customer';

//Express middleware "authorize" checks user permissions for a specific API
const authorize = (api: string) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(res.locals.employee.roles[1].permissions);
    const roles: CUSTOMER.Role[] = res.locals.user.roles;
    console.log(roles)
    const permissions = roles.filter(p => { console.log(p.permissions); return p.permissions });
    if (permissions.filter(p => p.name).length > 0) {
      next();
    } else {
      res.status(403).send("You don't have the permission to perfom this action!");
    }
  }
}

export {
  authorize
}