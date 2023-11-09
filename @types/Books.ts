export namespace BOOK {
    export interface createBook {
 
      id: number;
      salon: string;
      street: string;
      Date: Date;
      time: Date;

      
    }
    
    export interface updateBook{
        id: number;
        salon:string;
        Date: Date;
        time: Date;
    
    }     
  
  }