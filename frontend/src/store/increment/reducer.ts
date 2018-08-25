import { Reducer } from 'redux'
import { IncrementState, IncrementType } from './types'



const reducer:Reducer<IncrementState> = (state = {number: 0}, action) => {
    switch (action.type) {
        case IncrementType.add: {
            return {...state, number: state.number + action.payload};
        }
        default:
            return state;
    }
}

export { reducer as IncrementReducer }