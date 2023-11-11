
import { Role } from "../db/entities/Roles.js";
import { In } from "typeorm";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { Salon } from "../db/entities/Salon.js";
import { SALON } from "../@types/Salon.js";

const insertSalon = async (payload: SALON.Item) => {
  try {
    
    const salon = new Salon();
    salon.name=payload.name;
    salon.city=payload.city;
    salon.street=payload.street;
    salon.startWorkTime=payload.startWorkTime;
    salon.endWorkTime = payload.endWorkTime;
    console.log(salon)
    // user.roles =roles.map(role => role.id);
    await Salon.save(salon);
  } catch (error) {
    throw ("Something went wrong , can't create a salon "+ error);
  }
}

const getSalon = async (id: number) => {
  return await Salon.findOneBy({
    id
  });
}

const getSalons = async () => {
  return await Salon.findAndCount();
}


const deleteSalon = async (salonId:number) => {
  try {
    const salon =await Salon.delete({id:salonId});
    if(salon){
      return salon;
    }
    else 
      return 1;
  } catch (error) {
    return 0;

};
}

const updateSalon= async (payload:SALON.updateSalon) => {
  try {
    const salon = await Salon.findOneBy({id:payload.id});
    console.log(salon)
      if(salon){
        salon.name =payload.name||salon.name;
        salon.city = payload.city || salon.city;
        salon.street = payload.street|| salon.street;
        salon.startWorkTime = payload.startWorkTime|| salon.startWorkTime;
        salon.endWorkTime = payload.endWorkTime|| salon.endWorkTime;

        console.log(salon)
        const result = await Salon.save(salon);
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
  insertSalon,
  getSalon,
  getSalons,
  updateSalon,
  deleteSalon,
}