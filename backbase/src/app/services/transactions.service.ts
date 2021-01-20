import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private dataUrl = "http://localhost:3000/data";

  constructor( private http : HttpClient ) { }

  getTransactions(){
    return this.http.get( this.dataUrl );
  }

  postTransactions( payload: Transaction ) : Observable<Transaction>{
    return this.http.post<Transaction>(this.dataUrl, payload);
}
}
