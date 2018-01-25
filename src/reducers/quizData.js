const initState = {
    token: '',
    thumbData: {},
    quizData: {}
}
export default function(state = initState, action){
    switch(action.type){
        case 'TOKEN':
            state = {
                ...state,
                token: action.token,
            }
            break
        case 'THUMBDATA':
            state = {
                ...state,
                thumbData: action.data,
            }
            break
        case 'QUIZDATA':
            state = {
                ...state,
                quizData: action.data,
            }
            break
    }
    return state;
}
