import { combineReducers } from 'redux';
import { IncrementReducer } from './increment/reducer'
import { IncrementState } from './increment/types'

// tslint:disable-next-line:interface-name
export interface ApplicationState {
    incrementStore: IncrementState
}

export const rootReducer = combineReducers<ApplicationState>({ incrementStore: IncrementReducer });
