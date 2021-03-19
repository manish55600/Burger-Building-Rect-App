import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const ingredientPrices = {
    salad: 0.5,
    cheese: 2,
    tikki: 2,
    veggie: 1.5,
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updateState = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - ingredientPrices[action.ingredientName],
        building: true
    }
    return updateObject(state, updateState)
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            veggie: action.ingredients.veggie,
            cheese: action.ingredients.cheese,
            tikki: action.ingredients.tikki
        },
        totalPrice: 4,
        error: false,
        building: false
    })
}

const fetchIngredientsFail = (state) => {
    return updateObject(state, {error: true})
}
const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state)
        default:
            return state;
    }
}

export default reducer;