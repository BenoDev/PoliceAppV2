import React, { Component } from "react";
import { getCustomer } from "../../apollo/customer";
import { Query } from "react-apollo";

class UserPage extends Component {
	componentWillMount() {
		if (!this.props.user.token) {
			this.props.history.push("/login");
		}
	}
	render() {
		return (
			<div>
				(
				<Query
					query={getCustomer}
					variables={{ customerAccessToken: this.props.user.token }}
				>
					{({ loading, error, data }) => {
						if (loading) return null;
						if (error) return `Error!: ${error}`;

						// const variants = data.node.variants.edges.map(variant => {
						// 	return {
						// 		id: variant.node.id,
						// 		title: variant.node.title,
						// 		availableForSale: variant.node.availableForSale,
						// 		price: variant.node.price
						// 	};
						// });

						return <div>{console.log(data)}</div>;
					}}
				</Query>
			</div>
		);
	}
}

export default UserPage;
