// increment Action
import { action } from 'typesafe-actions';
import { IncrementType } from './types';


export const increment = (value:number) => action(IncrementType.add, value)

