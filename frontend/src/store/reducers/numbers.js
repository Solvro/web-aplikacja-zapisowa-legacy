function numbers(state = {}, action){
    // tslint:disable-next-line:no-console
    console.log(state, action);
    if (action.type === 'INCREMENT'){
        // tslint:disable-next-line:no-console
        console.log('STATE', state);
        // tslint:disable-next-line:no-console
        console.log('actionAction', action);
        return {
            ...state,
            numbers: (state.numbers || 1) + action.numbers
        }
    }

    return state;
}

export default numbers;