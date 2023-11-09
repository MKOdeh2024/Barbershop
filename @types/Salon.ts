export namespace SALON {
    export interface Item {
      name: string;
      city: string;
      street: string;
      startWorkTime: Date;
      endWorkTime: Date;
      barbers: number[];
    }
    export interface updateSalon {
      id:number;
      name?:string;
      city?: string;
      street?: string;
      startWorkTime?: Date;
      endWorkTime?: Date;
      barbers?: number[];
    }


  
  }
  
