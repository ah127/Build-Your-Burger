import React,{Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component{
    state = {
        purchasing:false
    }

    componentDidMount(){
       this.props.onInitIngredients();
    }

    updatePurchase=(ingredients)=>{
        const sum = Object.keys(ingredients)
                    .map((igKey)=>{
                        return ingredients[igKey];
                    }).reduce((sum,el)=>{
                        return sum+el;
                    },0);

       return sum>0
    }
    purchaseHandler =()=>{
        if(this.props.isAuthenticated){
            this.setState( {purchasing:true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchasingCancelHandler = ()=>{
        this.setState({purchasing:false});
    }
    purchasingSuccessHandler = ()=>{

            this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
    
        let burger = this.props.error ? <p>Couldnot load the ingredients</p> : <Spinner/>;
        let orderSummary = null;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        isAuth = {this.props.isAuthenticated}
                        purchaseable = {this.updatePurchase(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        />
                </Aux>
            )

             orderSummary = <OrderSummary 
                    price = {this.props.price}
                    ingredients={this.props.ings}
                    purcahseCanceled={this.purchasingCancelHandler}
                    purchaseContinued={this.purchasingSuccessHandler}
                    />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) =>{
        return {
            onIngredientAdded:(ingName)=>{dispatch(actions.addIngredient(ingName))},
            onIngredientRemoved:(ingName)=>{dispatch(actions.removeIngredient(ingName))},
            onInitIngredients:()=>{dispatch(actions.initIngredients())},
            onInitPurchase:()=>{dispatch(actions.purchaseInit)},
            onSetAuthRedirectPath:(path)=>{dispatch(actions.setAuthRedirectPath(path))}
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));