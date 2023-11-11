import { Barber } from "../db/entities/Barber.js";
import { Role } from "../db/entities/Roles.js";
import { Permission } from "../db/entities/Permission.js";
import { Any, In } from "typeorm";
import { BARBER } from "../@types/Barber.js";



const insertRole = async (payload: BARBER.Role) => {
  try {
    const role = new Role();

    role.name = payload.name;
    role.permissions = await Permission.findBy({
      id: In(payload.permissions)
    });
    console.log(role.permissions)
    // role.permissions = permissions.map(permission => permission.id);
    await role.save();
    return role;
  } catch (error) {
    console.log(error);

    throw ("Something went wrong");
  }
}

const assignRole = async (payload: BARBER.roleAssign) => {
  console.log(payload);
  const barber = await Barber.findOneBy({
    id: payload.barberId
  });
  console.log(barber);
  if (barber) {
    const role = await Role.findOneBy({
      name: payload.role
    })
    console.log(role);
    if (role) {
      const checkRoles = barber.roles.find((role1) => role1.name === role.name)
      console.log(checkRoles)
      if (!checkRoles) {
        barber.roles.push(role);
        await Barber.save(barber);
        return barber;
      } else throw ("User already have this role!");
    } else throw ("role not found!");
  } else throw ("Barber not found");

}




export {
  insertRole,
  assignRole
}