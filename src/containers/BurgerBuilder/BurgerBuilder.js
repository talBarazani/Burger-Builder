import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildConstrols'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDINT_PRICES = {
    cheese: 0.5,
    bacon: 0.7,
    meat: 1.3,
    salad: 0.4
}


class BurgerBuilder extends Component{
    state = {
        ingredients:  {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState = (ingredients)=>{
        const sum = Object.keys(ingredients)
                .map(ingKey => {
                    return ingredients[ingKey]
                })
                .reduce((sum, el)=> {
                    return sum + el
                }, 0)
            this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {

        let oldCount = this.state.ingredients[type]
        const updatedCount = oldCount+1;
        let updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDINT_PRICES[type]
        const oldPrice = this.state.totalPrice
        this.setState({totalPrice : oldPrice + priceAddition, ingredients : updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type]
        if(oldCount === 0) return ;
        const updatedCount = oldCount-1;
        let updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDINT_PRICES[type]
        const oldPrice = this.state.totalPrice
        this.setState({totalPrice : oldPrice - priceAddition, ingredients : updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler  = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseConinueHandler = () => {
        //alert('Continue')
        this.setState({loading: true})
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : 'Tal Barazani',
                adress : {
                    street: 'Sayfan',
                    zipCode: 12355,
                    city: 'Gan-Ner'
                },
                email : 'blba.gmail.com'
            },
            deliveryMethod: 'fastTest'
        }
        axios.post('/orders.json', order)
            .then(respone => {
                this.setState({loading: false, purchasing: false}) 
            })
            .catch(error => { 
                this.setState({loading: false,  purchasing: false})
            })
    }

    

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummery = 
            <OrderSummery 
                ingredients={this.state.ingredients}
                totalPrice = {this.state.totalPrice}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued= {this.purchaseConinueHandler}/>

        if(this.state.loading){
            orderSummery = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}> 
                    {orderSummery}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    orderd= {this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios)