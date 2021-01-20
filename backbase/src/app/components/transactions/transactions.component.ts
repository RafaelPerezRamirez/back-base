import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as transactionsActions from '../../state/transactions.actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  data;
  colors = ['pink', 'red', 'blue', 'yellow', 'orange'];
  images = [];
  randomColors = []

  constructor( private store : Store ) { }

  ngOnInit(): void {
    this.store.dispatch(new transactionsActions.GetDataAction());
    this.setAllTransactions();
  }

  setAllTransactions(){
    this.store.subscribe((state:any) => {
      let processedData = Object.keys(state.transactions).map( key => state.transactions[key] ).reverse();
      if(state.search.term != ''){
        this.data = processedData.filter(transaction =>  transaction.merchant.name.toLowerCase().includes(state.search.term.toLowerCase()))
        return;
      }
      this.data = processedData;
      this.getImages();
      this.getBorderColor();
    })
  }

  getBorderColor(){
    this.randomColors = [];
    for (let i = 0; i <= this.data.length; i++) {
      this.randomColors.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
    }
  }

  getImages(){
    this.images = [];
    for (let i = 0; i <= this.data.length; i++) {
      this.images.push(Math.floor(Math.random() * 12) + 1);
    }
  }
}
