export default function noticeReducer (state = { isAllRead: false }, action) {
    switch (action.type) {
        case 'READ_ALL':
            return {...state, isAllRead: true}  
        default:
            return state
    }
}