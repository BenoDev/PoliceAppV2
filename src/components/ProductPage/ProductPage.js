import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

// import ProductGallery from '../products/productGallery';
import Product from "./product";

class ProductPage extends Component {
	showProduct() {
		const ID = this.props.match.params.id;
		console.log(ID);
		return (
			<Query query={GET_PRODUCT_BY_ID} variables={{ ID }}>
				{({ loading, error, data }) => {
					if (loading) return null;
					if (error) return `Error!: ${error}`;

					const images = data.node.images.edges.map(image => {
						return {
							id: image.node.id,
							original: image.node.originalSrc,
							thumbnail: image.node.originalSrc
						};
					});

					// const variants = data.node.variants.edges.map(variant => {
					// 	return {
					// 		id: variant.node.id,
					// 		title: variant.node.title,
					// 		availableForSale: variant.node.availableForSale,
					// 		price: variant.node.price
					// 	};
					// });

					return (
						<Fragment>
							<Product
								checkoutLineItemsAdd={
									this.props.checkoutLineItemsAdd
								}
								updateCheckout={this.props.updateCheckout}
								checkout={this.props.checkout}
								images={images}
								title={data.node.title}
								options={data.node.options}
								description={data.node.description}
								variants={data.node.variants}
								selectedOptions={data.node.selectedOptions}
							/>
						</Fragment>
					);
				}}
			</Query>
		);
	}

	render() {
		return <div className="product-page">{this.showProduct()}</div>;
	}
}

const GET_PRODUCT_BY_ID = gql`
	query searchProductById($ID: ID!) {
		node(id: $ID) {
			id
			... on Product {
				title
				images(first: 5) {
					edges {
						node {
							id
							originalSrc
						}
					}
				}
				description
				options {
					id
					name
					values
				}
				variants(first: 100) {
					edges {
						node {
							id
							availableForSale
							price
							title
							selectedOptions {
								name
								value
							}
							image {
								originalSrc
								id
							}
						}
					}
				}
			}
		}
	}
`;

export default ProductPage;

// {

// 					const images = data.node.images.edges.map(image => {
// 						return {
// 							id: image.node.id,
// 							url: image.node.originalSrc
// 						};
// 					});

// 					<ProductGallery images={images} />
// }
