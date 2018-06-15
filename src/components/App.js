import "semantic-ui-css/semantic.min.css";
// import "../semantic/dist/semantic.min.css";
import "../style/main.css";

import React, { Component } from "react";

import { graphql, gql, compose } from "react-apollo";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./NavBar";
import HomePage from "./HomePage/HomePage";
import Shop from "./Shop/Shop";

import {
	createCheckout,
	checkoutLineItemsAdd,
	checkoutLineItemsUpdate,
	checkoutLineItemsRemove,
	checkoutCustomerAssociate,
	addVariantToCart,
	updateLineItemInCart,
	removeLineItemInCart,
	associateCustomerCheckout
} from "../apollo/checkout";

class App extends Component {
	constructor() {
		super();

		this.state = {
			checkout: { lineItems: { edges: [] } }
		};
	}

	render() {
		return (
			<BrowserRouter>
				<NavBar>
					<Switch>
						<Route path="/shop" component={Shop} />
						<Route path="/" component={HomePage} />
					</Switch>
				</NavBar>
			</BrowserRouter>
		);
	}
}

export default compose(
	graphql(createCheckout, { name: "createCheckout" }),
	graphql(checkoutLineItemsAdd, { name: "checkoutLineItemsAdd" }),
	graphql(checkoutLineItemsUpdate, { name: "checkoutLineItemsUpdate" }),
	graphql(checkoutLineItemsRemove, { name: "checkoutLineItemsRemove" }),
	graphql(checkoutCustomerAssociate, { name: "checkoutCustomerAssociate" })
)(App);
