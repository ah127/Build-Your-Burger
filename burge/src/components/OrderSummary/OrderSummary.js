import React,{Component} from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../hoc/Aux/Aux';

class OrderSummary extends Component{
    //This could be a functional Component,doesn't have to be a class. I just did for debuggign
    componentWillUpdate(){
        console.log('[Order Summary WillUpdate' );
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKey)=>{
            return (
                    <li key={igKey}>
                        <span style={{textTransform:"capitalize"}}>{igKey}</span>:{this.props.ingredients[igKey]}
                    </li>
                );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious Burger With the following ingrdoents:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Your Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purcahseCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;