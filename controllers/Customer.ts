import { Role } from "../db/entities/Roles.js";
import { In } from "typeorm";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { CUSTOMER } from "../@types/Customer.js";
import { Customer } from "../db/entities/Customer.js";

const signUp = async (payload: CUSTOMER.createCustomer) => {
  try {
    
    const customer = new Customer();
    customer.firstName=payload.firstName;
    customer.midName=payload.midName;
    customer.lastName=payload.lastName;
    customer.phoneNumber=payload.phoneNumber;
    customer.email = payload.email;
    customer.password = payload.password;
    customer.gender =payload.gender;
    customer.roles = await Role.findBy({
      id: In(payload.role)
    });
    console.log(customer)
    // user.roles =roles.map(role => role.id);
    await Customer.save(customer);
    return customer;
  } catch (error) {
    throw ("Something went wrong , can't create an customer "+ error);
  }
}

const getcustomer = async (id: number) => {
  return await Customer.findOneBy({
    id
  });
}

const getcustomers = async () => {
  return await Customer.findAndCount();
}

const login = async (email: string, password: string) => {

  const customer = await Customer.findOneBy({
    email
  });
  console.log(email, password, customer);
  const passwordMatching = await bcrypt.compare(password, customer?.password || '');

  if (customer && passwordMatching) {
    const token =
      jwt.sign({
        email: customer.email,
        id: customer.id
      }, process.env.JWT_SECRET_KEY || '', {
        expiresIn: "30m",
      });

    return token;
  } else {
    throw ("somethin went wrong!");
  }

}

const deletecustomer = async (customerId:number) => {
  try {
    const customer =await Customer.delete({id:customerId});
    if(customer){
      return customer;
    }
    else 
      return 1;
  } catch (error) {
    return 0;

};
}

const updatecustomer= async (payload:CUSTOMER.updateCustomer) => {
  try {
    const customer = await Customer.findOneBy({id:payload.id});
    console.log(customer)
      if(customer){
        customer.firstName=payload.firstName || customer.firstName;
        customer.midName=payload.midName || customer.midName;
        customer.lastName=payload.lastName || customer.lastName;
        customer.phoneNumber=payload.phoneNumber || customer.phoneNumber;
        customer.password = payload.password || customer.password;
        console.log(customer)
        const result = await Customer.save(customer);
        if(result){
          return result;
        }else {
          return 2;
        }
    }else 
        return 1;
  
  } catch (error) {
    console.log(error)
    return 0;

};
}



export {
  signUp,
  getcustomer,
  getcustomers,
  updatecustomer,
  deletecustomer,
  login
}