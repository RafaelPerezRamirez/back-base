import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Transaction } from 'src/app/model/transaction.model';
import { TransactionsService } from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';
import * as transactionsActions from '../../state/transactions.actions';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    group: FormGroup;
    currentdate: Date = new Date();
    money: number = 0;
    property: string = "";
  constructor( 
    private _transactionsService : TransactionsService,
    private store : Store  
  ) { }

  ngOnInit(): void {
    this.group = new FormGroup({
        from : new FormControl( null, Validators.required ),
        merchant : new FormControl( null, Validators.required ),
        amount : new FormControl( null, Validators.required )
    });
    
    if (localStorage.getItem("currency") != null) {
      this.money = Number( localStorage.getItem('currency') );
      this.property = `Free checking (4692) - $${this.money}`;
    }else{
        localStorage.setItem( 'currency', JSON.stringify(10000) );
        this.money = Number( localStorage.getItem('currency') );
        this.property = `Free checking (4692) - $${this.money}`;
    }
  }

  sendTransaction(){
    if(this.money >= 500){
        Swal.fire({
          icon: 'question',
          title: "Process with this transaction?",
          text: 'Merchant: ' + this.group.get('merchant').value + ' Amount: $' + this.group.get('amount').value,
        }).then( () => {
            this.processTransaction();
        });
    }else{
        Swal.fire({
          icon: 'error',
          title: "You don`t have enough money",
        });
        return;
    }
  }

  processTransaction(){
    this.setMoney( this.group.get('amount').value );
    const newTransaction = {
      id: Math.floor(Math.random()*1000),
      transaction:{
        amountCurrency: {
          amount : this.group.get('amount').value,
        },
        type: 'Online transfer'
      },
      merchant:{
        name: this.group.get('merchant').value,
      },
      dates:{
        valueDate: this.currentdate.getTime()
      }
    }
    
    this.store.dispatch(new transactionsActions.PostDataAction( newTransaction ));
    this.group.reset({ from: this.property, merchant: '', amount: '' });
  }
  setMoney( value ){
      const newValue = this.money - value;
      localStorage.setItem( 'currency', JSON.stringify(newValue) );
      this.money = Number( localStorage.getItem('currency') );
      this.property = `Free checking (4692) - $${newValue}`;
  }

}
