import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class checkout extends Component{
   

    checkoutCancelHandler =()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
            let summary = <Redirect to="/"/>
            if(this.props.ings){
                console.log('mugi',this.props.purchased);
                const purchaseRedirect = this.props.purchased ? <Redirect to="/"/>:null;
                
                summary = (
                    <div>
                        {purchaseRedirect}
                        <CheckoutSummary 
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.checkoutCancelHandler}
                        onCheckoutContinued={this.checkoutContinuedHandler}
                        />

                         <Route 
                        path={this.props.match.path + "/contact-data"} 
                        component={ContactData}
                        />
                    </div>
                )
            }
        return summary;
    }   
}

const mapStateToProps = (state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        puchased:state.order.purchased
    }
};




export default connect(mapStateToProps)(checkout);