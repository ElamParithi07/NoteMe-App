export const settoken =(token)=>{
    return { type : 'SET_TOKEN', payload : token}
}

export const cleartoken =()=>{
    return { type: 'CLEAR_TOKEN'}
}