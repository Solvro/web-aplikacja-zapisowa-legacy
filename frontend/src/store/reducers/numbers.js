function numbers(state = {}, action){
    if (action.type === 'INCREMENT'){
        return {
            ...state
        }
    }

    return state;
}

export default numbers;