import { 
    SEARCH_DATA
} from './types';

export interface SearchState{
    term: string
}

export const initialState: SearchState = {
    term: ''
}

export function searchReducer(state = initialState, action): SearchState{
    switch (action.type) {
        case SEARCH_DATA: 
            return{
                ...state,
                term: action.payload
            }
        default:
            return state;
    }
}
