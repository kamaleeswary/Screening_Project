import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  constructor(private http: HttpClient ) { }
  /**
   * used http to get the json data
   * @returns json object
   */
  public getBooks() {
    return this.http.get('https://s3.amazonaws.com/api-fun/books.json');
  }
}
