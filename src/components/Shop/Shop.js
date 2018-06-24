import _ from "lodash";
import React, { Component } from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import ShopProduct from "./shopProduct";
import Sidebar from "./sidebarDesktop";

class Shop extends Component {
	state = {
		filter: null,
		sortKey: "RELEVANCE",
		priceOrder: null
	};

	onProductClick = id => {
		this.props.history.push(`/product/${id}`);
	};

	onOrderChange = (sortKey, priceOrder) => {
		this.setState({ sortKey, priceOrder }, () => {
			console.log(this.state, "Lullabbiones");
		});
	};

	componentWillMount() {
		if (this.props.match.params.productType) {
			this.setState({
				filter: this.props.match.params.productType
			});
		}
		console.log(this.props.match.params, "filter");
	}

	renderProductsList() {
		return (
			<Query
				notifyOnNetworkStatusChange
				query={PRODUCT_TYPE}
				variables={{
					productType: this.state.filter,
					sortKey: this.state.sortKey
				}}
			>
				{({ loading, error, data, variables }) => {
					if (loading) return "Loading...";
					if (error) return `Error! ${error.message}`;
					let products = data.shop.products.edges;

					if (this.state.priceOrder) {
						const orderedProducts = _.orderBy(
							products,
							e => {
								return parseInt(
									e.node.variants.edges[0].node.price
								);
							},
							[this.state.priceOrder]
						);

						console.log(orderedProducts, "ordered prodcut");

						products = orderedProducts;
					}

					return products.map(product => {
						return (
							<ShopProduct
								key={product.node.id}
								image={
									product.node.images.edges[0].node
										.originalSrc
								}
								description={product.node.title}
								price={
									product.node.variants.edges[0].node.price
								}
								onClickProduct={() =>
									this.onProductClick(product.node.id)
								}
							/>
						);
					});
				}}
			</Query>
		);
	}

	render() {
		const { order } = this.props;
		return (
			<Sidebar onOrderChange={this.onOrderChange}>
				<div className="shop-container">
					{this.renderProductsList()}
					{console.log(this.props, "ffdkdkdkf")}
				</div>
			</Sidebar>
		);
	}
}

const PRODUCT_LIST = gql`
	query {
		shop {
			products(first: 20) {
				edges {
					node {
						id
						title
						variants(first: 1) {
							edges {
								node {
									price
								}
							}
						}
						images(first: 1) {
							edges {
								node {
									originalSrc
								}
							}
						}
					}
				}
			}
		}
	}
`;

const PRODUCT_TYPE = gql`
	query searchProductByType($productType: String, $sortKey: ProductSortKeys) {
		shop {
			products(first: 20, query: $productType, sortKey: $sortKey) {
				edges {
					node {
						id
						title
						variants(first: 1) {
							edges {
								node {
									price
								}
							}
						}
						images(first: 1) {
							edges {
								node {
									originalSrc
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default Shop;
