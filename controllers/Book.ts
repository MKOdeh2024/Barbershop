import { BOOK } from "../@types/Books";
import { Book } from "../db/entities/Books";



const insertBook = async (customerId:number,payload: BOOK.createBook) => {
    try {
        console.log(customerId)
        console.log(payload)

    const book =new Book();
    book.salon = payload.salon;
    book.street = payload.street;
    book.Date = payload.Date;
    book.time = payload.time;
    console.log(book)
    await Book.save(book);
    return book;
  } catch (error) {
    throw ("Something went wrong , can't create book "+error);
  }
}

const getBooks = async (bookId:number) => {
    return await Book.findAndCount();

};

const getBook = async (bookId:number) => {
    try { 
      const book =await Book.findOneBy({id:bookId});
      if(book){
        return book;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
    }
};

const deleteBook = async (bookId:number) => {
    try {
      const book =await Book.delete({id:bookId});
      if(book.affected !=0){
        return book;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
  
  };
}

const updateBook= async (payload:BOOK.updateBook) => {

    const bookId = payload.id;
    try {
      const book = await Book.findOneBy({id:bookId});
      console.log(book)
        if(book){
            book.Date =payload.Date || book.Date;
            book.time = payload.time || book.time;
          console.log(book);
          const result = await Book.save(book);
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
    insertBook,
    getBook,
    getBooks,
    deleteBook,
    updateBook
  }