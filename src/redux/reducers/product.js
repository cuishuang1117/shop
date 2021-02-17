const initState = []

export default function personReducer (preState = initState, action){
    const {type, data} = action
    switch (type) {
        case 'GET_ITEMS':
            return [...data]   
        default:
            return preState
    }
}