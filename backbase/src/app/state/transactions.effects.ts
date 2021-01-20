import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";  

import * as transactionsActions from './transactions.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TransactionsService } from "../services/transactions.service";
import { Transaction } from '../model/transaction.model';
import { Action } from "@ngrx/store";

import { 
    GET_DATA,
    POST_DATA
} from "./types";

@Injectable()
export class TransactionsEffects {
    constructor( 
        private actions: Actions, 
        private _transactionsService : TransactionsService 
    ) {}

    @Effect() getData = this.actions.pipe(
        ofType(
            GET_DATA
        ),
        mergeMap((actions: transactionsActions.GetDataAction)=>
            this._transactionsService.getTransactions().pipe(
                map(
                    (transactions: Transaction[]) =>
                        new transactionsActions.GetAllDataAction( transactions )
                ),
                catchError( err => of( new transactionsActions.GetFailDataAction(err) ) )
            )
        )
    )

    @Effect() createData = this.actions.pipe(
        ofType(
            POST_DATA
        ),
        map( (action: transactionsActions.PostDataAction) => action.payload ),
        mergeMap((transaction: Transaction)=>
            this._transactionsService.postTransactions( transaction ).pipe(
                map(
                    (newTransaction: Transaction) =>
                        new transactionsActions.PostAllDataAction( newTransaction )
                ),
                catchError( err => of( new transactionsActions.PostDataFailAction(err) ) )
            )
        )
    )
}    