
export const addItem = (itemId : number) => ({
    type : 'ADD_ITEM',
    itemId : itemId
})

export const reduceItem = (itemId : number) =>  ({
    type : 'REDUCE_ITEM',
    itemId : itemId
})

export const toggleReview = () => ({
    type :"TOGGLE_REVIEW"
})

export const dineIn = (dineIn : any) => ({
    type :"DINE_IN",
    dineIn : dineIn
})

export const enableShowmore = () => ({
    type :"ENABLE_SHOWMORE"
})

export const toggleModal = () => ({
    type :"TOGGLE_MODAL"
})


export const resetState = () =>({
    type:'RESET_STATE'
})


export const selectMenu = ( id : any) =>({
    type:'SELECT_MENU',
    id : id
})
