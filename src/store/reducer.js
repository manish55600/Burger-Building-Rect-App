import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        veggie: 0,
        cheese: 0,
        tikki: 0,
    },
    totalPrice: 4
}

const ingredientPrices = {
    salad: 0.5,
    cheese: 2,
    tikki: 2,
    veggie: 1.5,
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1

                },
                totalPrice: state.totalPrice + ingredientPrices[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    
                },
                totalPrice: state.totalPrice - ingredientPrices[action.ingredientName]
            }
        default:
            return state;
    }
    return state
}

export default reducer;