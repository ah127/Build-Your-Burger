import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFailed= (error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurgerStart = ()=>{
   return {
       type:actionTypes.PURCHASE_BURGER_START
   }
}

export const purchaseBurger = (orderData,token)=>{
    return (dispatch)=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
        .then((response)=>{
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        })
        .catch((err)=>{
            dispatch(purchaseBurgerFailed(err));
        })
    }
}

export const purchaseInit = ()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders)=>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}   

export const fetchOrdersFail = (errors)=>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        errors:errors
    }
}  

export const fetchOrders = (token,userId)=>{
    return (dispatch)=>{
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
            .then(res=>{
                const fetchedOrders = [];
                for(let key in res.data){
                    console.log('load bhayo',{
                        ...res.data[key],
                        id:key
                    });
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders)); 
            })
            .catch((err)=>{
                dispatch(fetchOrdersFail(err))
            })
    }
}

export const fetchOrdersStart = ()=>{
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}
