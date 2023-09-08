import { Component } from '@angular/core';
import { BooksService } from './books.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { Book } from './models/book.model';

//Interface for JSON Object
export interface response {
  data: object,
  status: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'books';
  listOfBooks; // stores the json Data from the response
  loader = true;
  sortType: boolean = false; // ascending or descending order

  constructor(private bookService: BooksService, private modalService: NgbModal) {}

  ngOnInit(): void {
    // Get data from the json 
    this.bookService.getBooks().subscribe(((res: response) => {
      if(res.status === 'success') {
      this.listOfBooks = res.data;
      this.loader = false;
      }
      else
      alert('There is a problem in getting json data');
    }));
  }

  /**
   * add a new book to the existing book collections
   */
  addBook(): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.type = 'add'; // Inject the action type to modal component
    modalRef.componentInstance.action.subscribe((result: any) => {  // receive the data from the modal
      this.listOfBooks.books = [...this.listOfBooks.books, result]; // update the existing values
    });
  }

  /**
   * delete the book from the existing book collections
   */ 
  deleteBook(index) { 
    this.listOfBooks.books.splice(index, 2)   // delete the book by using index value
  }

   /**
   * update the book details
   */
  updateBook(book: Book) {
    const modalRef = this.modalService.open(ModalComponent); // 
    modalRef.componentInstance.book = book; // pass the book list to modal component to show the book details
    modalRef.componentInstance.type = 'update'; // Inject the action type to modal component
    modalRef.componentInstance.action.subscribe((result: any) => { console.log(result); }); // update the existing values
  }

  /**
   * sort by alphabatical order
  */
 sort() {
  this.sortType = !this.sortType;
  if(this.sortType)
  this.listOfBooks.books.sort((a,b) => a.title > b.title ? 1 : -1)
  else
  this.listOfBooks.books.sort((a,b) => a.title < b.title ? 1 : -1)
 }

}
