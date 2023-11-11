
import { Role } from "../db/entities/Roles.js";
import { In } from "typeorm";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { BARBER } from "../@types/Barber.js";
import { Salon } from "../db/entities/Salon.js";
import { Barber } from "../db/entities/Barber.js";

const signUp = async (payload: BARBER.createBarber) => {
  try {
    
    const barber = new Barber();
    const salon = new Salon();
    barber.firstName=payload.firstName;
    barber.midName=payload.midName;
    barber.lastName=payload.lastName;
    barber.phoneNumber=payload.phoneNumber;
    barber.email = payload.email;
    barber.password = payload.password;
    let time = new Date().getTime();
    let date = new Date(time);
    barber.passwordChangedAt = date||null;
    barber.logoutAt = date||null;
    barber.gender =payload.gender;
    salon.barbers.push(barber);
    barber.roles = await Role.findBy({
      id: In(payload.role)
    });
    console.log(barber)
    // user.roles =roles.map(role => role.id);
    await barber.save();
    return barber;
  } catch (error) {
    throw ("Something went wrong , can't create an barber "+ error);
  }
}

const getBarber = async (id: number) => {
  return await Barber.findOneBy({
    id
  });
}

const getBarbers = async () => {
  return await Barber.findAndCount();
}

const getPersonalInformation = async (barberId:number) => {
  const barbId = barberId;
  try {
    const info = await Barber.findOneBy({id:barbId})
    if(info){      
      return info;
    }else 
      return 1;
  } catch (error) {
    return 0;
  }
};

const login = async (email: string, password: string) => {

  const barber = await Barber.findOneBy({
    email
  });
  console.log(email, password, barber);
  const passwordMatching = await bcrypt.compare(password, barber?.password || '');

  if (barber && passwordMatching) {
    const token =
      jwt.sign({
        email: barber.email,
        id: barber.id
      }, process.env.JWT_SECRET_KEY || '', {
        expiresIn: "30m",
      });

    return token;
  } else {
    throw ("somethin went wrong!");
  }

}

const deleteBarber = async (barberId:number) => {
  try {
    const barber =await Barber.delete({id:barberId});
    if(barber){
      return barber;
    }
    else 
      return 1;
  } catch (error) {
    return 0;

};
}

const updateBarber= async (payload:BARBER.updateBarber) => {
  try {
    const barber = await Barber.findOneBy({id:payload.id});
    console.log(barber)
      if(barber){
        barber.firstName =payload.firstName||barber.firstName;
        barber.midName = payload.midName || barber.midName;
        barber.lastName = payload.lastName || barber.lastName;
        barber.phoneNumber = payload.phoneNumber|| barber.phoneNumber;
        barber.email = payload.email|| barber.email;
        barber.password = payload.password|| barber.password;
        let time = new Date().getTime();
        let date = new Date(time);
        barber.passwordChangedAt = date||barber.passwordChangedAt;
        barber.logoutAt = date||barber.logoutAt;

        console.log(barber)
        const result = await Barber.save(barber);
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
  getBarber,
  getPersonalInformation,
  getBarbers,
  updateBarber,
  deleteBarber,
  login
}