export namespace BARBER {
    export interface createBarber {

        id: number;
        firstName: string;
        midName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        role:number[];
        gender: string;
      
    }
    export interface Role {
      id: number;
      name: string;
      permissions: number[];
    }
  
    export interface Permission {
      id: number;
      name: string;
    }
  
    export interface Profile {
      id: number;
      firstName: string;
      lastName: string;
      DOB: Date;
    }
  
    export interface roleAssign{
      barberId:number;
      role:string;
    }
  
  
  
    export interface permissionAssign{
      roleId:number;
      permission:string;
    }
    export interface updateBarber{
      id:number;
      firstName: string;
      midName: string;
      lastName: string;
      email: string;
      password: string;
      phoneNumber: string;
    
    }
  
    export interface updatePersonalInformation {
      id: number;
      firstName?: string;
      midName?: string;
      lastName?: string;
      email?: string;
      phoneNumber?:string;
      city?:string;
      street?:string;
      status?:string;
    }
  
  }