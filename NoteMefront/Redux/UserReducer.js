const InitialState={
    usertoken: "normal",
}

const UserReducer =( state= InitialState, action)=>{
    switch(action.type){
        case 'SET_TOKEN':
            return {...state, usertoken: action.payload};
        case 'CLEAR_TOKEN':
            return {...state, usertoken: null};
        default:
            return state;
    }
}

export default UserReducer;