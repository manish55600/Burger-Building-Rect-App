import React, { Component } from "react"
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const ingredientPrices = {
    salad : 0.5,
    cheese : 2,
    tikki : 2,
    veggie : 1.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react--my-burger-cac29-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients : response.data })
            }).catch(error => { this.setState ({ error : true }) })
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el 
        } , 0)

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount
        const priceAddition = ingredientPrices[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({ totalPrice : newPrice, ingredients : updatedIngredient })
        this.updatePurchaseState(updatedIngredient)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount
        const priceSubtraction = ingredientPrices[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceSubtraction
        this.setState({ totalPrice : newPrice, ingredients : updatedIngredient })
        this.updatePurchaseState(updatedIngredient)
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false })
    }

    purchaseContinueHandler = () => {
        // alert('You Continue')
        this.setState({ loading: true })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Manish Shah',
                address: {
                    street: 'test street',
                    zipCode: '413114',
                    country: 'India'
                },
                email: 'ms@ms.co'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            })
    }

    render () {
        const disableInfo = {
            ...this.state.ingredients
        }
        for ( let key in disableInfo ) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients Can't be loaded</p> : <Spinner /> 
        if ( this.state.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved = {this.removeIngredientHandler} 
                    disabled = {disableInfo} 
                    price = {this.state.totalPrice} 
                    purchasable = {this.state.purchasable} 
                    ordered = {this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients}
                purchaseCancelled = {this.purchaseCancelHandler} 
                purchaseContinued = {this.purchaseContinueHandler} 
                totalPrice = {this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)