import * as actionsTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility'

const initalState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state) => {
    return updateObject(state, { purchased: false })
}

const purchaseBurgerStart = (state) => {
    return updateObject(state, { loading: true })
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, { 
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder) 
    })
}

const purchaseBurgerFail = (state) => {
    return updateObject (state, {loading: false})
}

const fetchOrdersStart = (state) => {
    return updateObject(state, {loading: true})
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const fetchOrdersFail = (state) => {
    return updateObject (state, {loading: false})
}

const reducer = ( state = initalState, action ) => {
    switch (action.type) {
        case actionsTypes.PURCHASE_INIT: return purchaseInit(state)            
        case actionsTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionsTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionsTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state)
        case actionsTypes.FETCH_ORDERS_START: return fetchOrdersStart(state)
        case actionsTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionsTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
        default: 
            return state
    }
}

export default reducer