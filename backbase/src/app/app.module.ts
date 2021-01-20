import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { FormComponent } from './components/form/form.component';

//Services
import { HttpClientModule } from "@angular/common/http";

//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//NGRX
import { transactionsReducer } from './state/transactions.reducer';
import { TransactionsEffects } from './state/transactions.effects';
import { FilterComponent } from './components/filter/filter.component';
import { searchReducer } from './state/search.reducer';


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    FormComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([TransactionsEffects]),
    StoreModule.forRoot({
      transactions: transactionsReducer,
      search: searchReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
