import AppDefaults from "../../Defaults/AppDefaults";



const INITIAL_STATE = {
  menuHeader : AppDefaults.menuHeader,
  menuList : AppDefaults.itemList,
  totalAmount : 0,
  selectedItemCount : 0,
  isReviewOrder :true,
  isDinein:true,
  isModalOpen :false
};


const Cart = (state = INITIAL_STATE,action:any) => {
  switch (action.type) {

    case 'RESET_STATE':
    return INITIAL_STATE

    case 'ADD_ITEM' :
      return {
        ...state ,
        menuList : state.menuList.map( (item : any) =>
        (item.itemId == action.itemId)
        ? {...item, 
          qty : item.qty >= item.maxQty ? item.qty  : item.qty + 1 ,
          amt :  (item.qty >= item.maxQty ? item.qty  : item.qty + 1) * item.sellingPrice
        }
        : item
        ),
        totalAmount : state.menuList.reduce( function(a, b){
          return a + b['amt']
      }, state.menuList.filter((item :any ) => item.itemId == action.itemId  && item.qty <20 )[0].sellingPrice)
        
      }
    
      case 'DINE_IN':
      return{
        ...state,
        isDinein : action.dineIn
      }

    case 'TOGGLE_REVIEW':
    return {
      ...state ,
      isReviewOrder : !state.isReviewOrder
    }

    case 'TOGGLE_MODAL':
    return {
      ...state ,
      isModalOpen : !state.isModalOpen
    }

    case 'SELECT_MENU' : 
    return{
      ...state,
      menuHeader : state.menuHeader.map((header:any)=> 
      (header.id == action.id)
        ? {...header, 
          isSelected : true 
        }
        : {...header, 
          isSelected : false 
        }
       )
    }

    case 'ENABLE_SHOWMORE':
    return {
      ...state ,
      isReviewOrder : true
    }
    
    case 'REDUCE_ITEM' : 
    return {
      ...state ,
      menuList : state.menuList.map( (item : any) =>
      (item.itemId == action.itemId)
      ? {...item, 
        qty : item.qty ==0 ? item.qty  : item.qty - 1 ,
        amt :  (item.qty ==0 ? item.qty  : item.qty - 1) * item.sellingPrice
      }
      : item
      ),
      totalAmount : state.menuList.reduce( function(a, b){
        return a + b['amt']
    }, -state.menuList.filter((item :any ) => item.itemId == action.itemId)[0].sellingPrice),
    }

    default:
      return state
  }
};

export default Cart