import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummery extends Component {

    //this caould be a function

    componentDidUpdate() {
        console.log('[OrderSummery] didUpdate')
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingkey => {
            return( 
                <li key={ingkey}>
                    <span style={{textTransform: 'capitalize'}}>{ingkey}</span>: {this.props.ingredients[ingkey]}
                </li>);
        });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingrediants:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
 
   
}

export default OrderSummery