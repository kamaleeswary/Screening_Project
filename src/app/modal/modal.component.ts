import { Component, OnInit, Input, Type } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // receiving book and type data from parent (app) component
  @Input() book: Book;
  @Input() type: string;

  // pass the data to parent component (app)
  action = new Subject<any>();

  // set the mode of operation edit or non-edit
  editmode = false;

  // create a form to store the new books
  addBookForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    purchaseLink: ['', [Validators.required]],
    PublishDate: ['', [Validators.required]],
  })

  constructor(public modalRef: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
   * setting the editmode 
   */
  edit() {
    this.editmode = true;
  }

  cancel() {
    this.editmode = false;
  }

  /**
   * updating the book details and pass the updated value to parent component 
   * parameter: book
   */
  save(book) {
    this.editmode = false;
    this.action.next(book);
    alert('Updated Successfully');
  }

  /**
 * Add the book and pass the value to parent component 
 */
  onSubmit() {
    if (this.addBookForm.invalid) {
      return;
    }
    this.action.next(this.addBookForm.value);
    console.log(this.addBookForm.value)
    alert('Added Successfully');
    this.modalRef.close('Close click');
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.addBookForm.controls;
  }

}
