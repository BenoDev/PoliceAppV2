import React, { Component } from "react";
import CartItem from "./cartItem";

import { Table } from "semantic-ui-react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

class Cart extends Component {
	removeItem = async (checkoutId, lineItemId) => {
		const res = await this.props.checkoutLineItemsRemove({
			variables: {
				checkoutId: checkoutId,
				lineItemIds: [lineItemId]
			}
		});

		const data = res.data.checkoutLineItemsRemove.checkout;

		this.props.updateCheckout(data);
	};

	updateItem = async (checkoutId, id, quantity) => {
		console.log(quantity);

		const res = await this.props.checkoutLineItemsUpdate({
			variables: {
				checkoutId: checkoutId,
				lineItems: [{ id, quantity }]
			}
		});

		const data = res.data.checkoutLineItemsUpdate.checkout;

		this.props.updateCheckout(data);
	};

	renderCartItems() {
		if (!this.props.checkout.id) {
			return <div>Errore Caricamento Carrello</div>;
		}
		if (this.props.checkout.lineItems.edges.length < 1) {
			return <div>Il tuo Carrello è vuoto</div>;
		}

		return this.props.checkout.lineItems.edges.map(lineItem => {
			const {
				id,
				title,
				quantity,
				variant: {
					price,
					image: { originalSrc }
				}
			} = lineItem.node;
			return (
				<CSSTransition key={id} timeout={300} classNames="fade">
					<CartItem
						removeItem={() =>
							this.removeItem(this.props.checkout.id, id)
						}
						updateItem={quantity =>
							this.updateItem(
								this.props.checkout.id,
								id,
								quantity
							)
						}
						title={title}
						quantity={quantity}
						price={price}
						image={originalSrc}
					/>
				</CSSTransition>
			);
		});
	}

	render() {
		return (
			<div>
				<Table fixed singleLine textAlign="center">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Articolo</Table.HeaderCell>
							<Table.HeaderCell>Status</Table.HeaderCell>
							<Table.HeaderCell>Description</Table.HeaderCell>
							<Table.HeaderCell>Description</Table.HeaderCell>
							<Table.HeaderCell>Description</Table.HeaderCell>
							<Table.HeaderCell>Description</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<TransitionGroup component={Table.Body}>
						{this.renderCartItems()}
					</TransitionGroup>
				</Table>
				<div>
					<a href={this.props.checkout.webUrl}>
						Procedi con l'ordine
					</a>
				</div>
			</div>
		);
	}
}
export default Cart;
