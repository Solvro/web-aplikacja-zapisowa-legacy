function numbers(state = {}, action){
    // tslint:disable-next-line:no-console
    console.log(state, action);
    if (action.type === 'INCREMENT'){
        return {
            ...state,
            index: state.index +1
        }
    }

    return state;
}

export default numbers;