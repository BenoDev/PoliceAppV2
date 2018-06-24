import "semantic-ui-css/semantic.min.css";
// import "../semantic/dist/semantic.min.css";
import "../style/main.css";

import React, { Component } from "react";

import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./NavBar";
import HomePage from "./HomePage/HomePage";
import Shop from "./Shop/Shop";
import ProductPage from "./ProductPage/ProductPage";
import Cart from "./Cart/Cart";

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

import CheckoutFragment from "../apollo/fragment/checkoutFragment";

class App extends Component {
	constructor() {
		super();

		this.state = {
			checkout: { lineItems: { edges: [] } }
		};
	}

	componentDidMount() {
		this.initCheckout();
	}

	initCheckout = async () => {
		const checkoutId = localStorage.getItem("checkoutId");

		if (checkoutId) {
			const res = await this.props.client.query({
				query: checkoutRecover,
				variables: {
					id: JSON.parse(checkoutId)
				}
			});

			if (res.data.node.id) {
				return this.setState({ checkout: res.data.node });
			}
		}

		const res = await this.props.createCheckout({
			variables: { input: {} }
		});
		// console.log(res.data.checkoutCreate.checkout);
		const data = res.data.checkoutCreate.checkout;

		this.setState({ checkout: data });

		localStorage.setItem("checkoutId", JSON.stringify(data.id));
	};

	updateCheckout = checkout => {
		this.setState({ checkout }, () => {
			console.log(this.state.checkout, "checkout");
		});
	};

	render() {
		return (
			<BrowserRouter>
				<NavBar>
					<Switch>
						<Route
							path="/product/:id"
							render={props => (
								<ProductPage
									{...props}
									checkoutLineItemsAdd={
										this.props.checkoutLineItemsAdd
									}
									updateCheckout={this.updateCheckout}
									checkout={this.state.checkout}
								/>
							)}
						/>
						<Route
							path="/cart"
							render={props => (
								<Cart
									{...props}
									checkoutLineItemsRemove={
										this.props.checkoutLineItemsRemove
									}
									checkoutLineItemsUpdate={
										this.props.checkoutLineItemsUpdate
									}
									checkout={this.state.checkout}
									updateCheckout={this.updateCheckout}
								/>
							)}
						/>

						<Route path="/shop/:productType" component={Shop} />
						<Route path="/shop" component={Shop} />
						<Route path="/" component={HomePage} />
					</Switch>
				</NavBar>
			</BrowserRouter>
		);
	}
}

const checkoutRecover = gql`
	query RecoverQuery($id: ID!) {
		node(id: $id) {
			id
			... on Checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`;

export default withApollo(
	compose(
		graphql(createCheckout, { name: "createCheckout" }),
		graphql(checkoutLineItemsAdd, { name: "checkoutLineItemsAdd" }),
		graphql(checkoutLineItemsUpdate, { name: "checkoutLineItemsUpdate" }),
		graphql(checkoutLineItemsRemove, { name: "checkoutLineItemsRemove" }),
		graphql(checkoutCustomerAssociate, {
			name: "checkoutCustomerAssociate"
		})
	)(App)
);
