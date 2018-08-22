// increment Action

function increment(numbers){
    return {
        numbers,
        type: 'INCREMENT'
    }
}

const actions = {
    increment
}

export default actions;