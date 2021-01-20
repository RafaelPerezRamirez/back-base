import { Action } from "@ngrx/store";
import { Transaction } from '../model/transaction.model';
import { 
    GET_DATA,
    GET_ALL_DATA,
    GET_FAIL_DATA,
    POST_DATA,
    POST_ALL_DATA,
    POST_FAIL_DATA,
    SEARCH_DATA
} from "./types";

export class GetDataAction implements Action{
    readonly type = GET_DATA;
}

export class GetAllDataAction implements Action{
    readonly type = GET_ALL_DATA;
    constructor(public payload: Transaction[] ) {}
}

export class GetFailDataAction implements Action{
    readonly type = GET_FAIL_DATA;
    constructor(public payload: Transaction) {}
}

export class PostDataAction implements Action{
    readonly type = POST_DATA;
    constructor(public payload: Transaction) {}
}

export class PostAllDataAction implements Action{
    readonly type = POST_ALL_DATA;
    constructor(public payload: Transaction) {}
}

export class PostDataFailAction implements Action{
    readonly type = POST_FAIL_DATA;
    constructor(public payload?: any) {}
}

export class SearchDataAction implements Action{
    readonly type = SEARCH_DATA;
    constructor(public payload?: string) {}
}