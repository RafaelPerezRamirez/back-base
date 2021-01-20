import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as transactionsActions from '../../state/transactions.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor( private store : Store ) { }

  ngOnInit(): void {
  }

  search(value){
    this.store.dispatch(new transactionsActions.SearchDataAction(value));
  }

}
