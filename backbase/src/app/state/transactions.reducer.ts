import { Transaction } from '../model/transaction.model';
import { 
    GET_DATA,
    GET_ALL_DATA,
    GET_FAIL_DATA,
    POST_DATA,
    POST_ALL_DATA,
    POST_FAIL_DATA
} from "./types";
//Reducer
export function transactionsReducer ( state: Transaction, action ){
    switch( action.type ){
        
        case GET_DATA:
            return { ...state };
        
        case GET_ALL_DATA:
            return { ...state, ...action.payload };

        case POST_ALL_DATA:
            return [...Object.keys(state).map( key => state[key] ), action.payload];
        
        case POST_FAIL_DATA:
            return { ...state,  ...action.payload };

        default:
            return state;
    }
}