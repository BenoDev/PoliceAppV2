import React, { Component } from "react";

import { Table, Icon } from "semantic-ui-react";

class CartItem extends Component {
	state = {};

	componentWillMount() {
		this.setState({ quantity: this.props.quantity });
	}

	onQuantityChange = event => {
		this.setState({ quantity: event.target.value }, () => {
			const res = this.props.updateItem(parseInt(this.state.quantity));
		});
	};

	render() {
		const {
			title,
			quantity,
			price,
			image,
			removeItem,
			updateItem
		} = this.props;
		return (
			<Table.Row>
				<Table.Cell
					verticalAlign="middle"
					style={{ display: "flex", alignItems: "center" }}
				>
					<img style={{ width: "50%" }} src={image} alt="" />{" "}
					<span>{title}</span>
				</Table.Cell>

				<Table.Cell>Taglia</Table.Cell>
				<Table.Cell>Colore</Table.Cell>
				<Table.Cell>{this.state.quantity}</Table.Cell>
				<Table.Cell>{price} €</Table.Cell>
				<Table.Cell>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-between"
						}}
					>
						<div style={{ marginBottom: "2rem" }}>
							<button
								className="buttonRemove"
								onClick={this.props.removeItem}
							>
								<span>remove</span>
								<div className="icon">
									<Icon
										className="fa fa-remove"
										name="remove"
									/>
									<i className="fa fa-check" />
								</div>
							</button>
						</div>
						<label>
							Quantità
							<input
								min="1"
								type="number"
								value={this.state.quantity}
								onChange={this.onQuantityChange}
							/>
						</label>
					</div>
				</Table.Cell>
			</Table.Row>
		);
	}
}

export default CartItem;
