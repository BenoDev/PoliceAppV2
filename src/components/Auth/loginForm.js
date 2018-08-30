import React, { Component } from "react";
import { Formik } from "formik";
import { withApollo } from "react-apollo";

import { getCustomer } from "../../apollo/customer";

import { Link } from "react-router-dom";

import {
	Button,
	Form,
	Grid,
	Message,
	Container,
	Segment
} from "semantic-ui-react";

class LoginForm extends Component {
	componentDidMount() {
		console.log(this.props);
	}
	onLoginSubmit = async (values, { setSubmitting, setErrors }) => {
		const input = {
			email: values.email,
			password: values.password
		};

		const res = await this.props.customerAccessTokenCreate({
			variables: { input }
		});

		console.log(res, "Risultato Login");

		if (res.data.customerAccessTokenCreate.customerAccessToken) {
			const customerAccessToken =
				res.data.customerAccessTokenCreate.customerAccessToken
					.accessToken;

			await this.props.checkoutCustomerAssociate({
				variables: {
					checkoutId: this.props.checkout.id,
					customerAccessToken
				}
			});

			localStorage.setItem(
				"auth-token",
				JSON.stringify(customerAccessToken)
			);

			const resCustomer = await this.props.client.query({
				query: getCustomer,
				variables: {
					customerAccessToken: customerAccessToken
				}
			});

			// console.log(resCustomer, "REs Customer");

			this.props.updateCustomer(
				customerAccessToken,
				resCustomer.data.customer
			);

			setSubmitting(false);

			//redirect to home page
			this.props.history.push("/");
		} else {
			// res.data.customerAccessTokenCreate.userErrors.forEach(error => {
			// 	console.log(error);
			// });
			setErrors({ password: "Username e/o password non corretti" });
			setSubmitting(false);
		}
	};

	render() {
		return (
			<div className="login">
				<h1>Registrati </h1>
				{/*
      The benefit of the render prop approach is that you have full access to React's
      state, props, and composition model. Thus there is no need to map outer props
      to values...you can just set the initial values, and if they depend on props / state
      then--boom--you can directly access to props / state.

      The render prop accepts your inner form component, which you can define separately or inline
      totally up to you:
      - `<Formik render={props => <form>...</form>}>`
      - `<Formik component={InnerForm}>`
      - `<Formik>{props => <form>...</form>}</Formik>` (identical to as render, just written differently)
    */}
				<Formik
					onSubmit={this.onLoginSubmit}
					initialValues={{
						email: "Lullaby",
						password: ""
					}}
					validate={values => {
						// same as above, but feel free to move this into a class method now.
						let errors = {};
						if (!values.email) {
							errors.email = "Campo Email Obbligatorio";
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
								values.email
							)
						) {
							errors.email = "Email non valida";
						}
						return errors;
					}}
					render={({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting
					}) => (
						<Container>
							<Grid centered padded columns={3}>
								<Grid.Column
									as={Segment}
									inverted
									textAlign="center"
								>
									<Form inverted onSubmit={handleSubmit}>
										<Form.Input
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											fluid
											label="Email"
											placeholder="Email"
											value={values.email}
										/>

										<Form.Input
											name="password"
											onChange={handleChange}
											onBlur={handleBlur}
											fluid
											label="Password"
											placeholder="Password"
											value={values.password}
											style={{ marginBottom: "2rem" }}
										/>

										<Button type="submit">Submit</Button>
									</Form>
									{touched.email &&
										errors.email && (
											<Message
												error
												content={errors.email}
											/>
										)}
									{touched.password &&
										errors.password && (
											<div className="login__error">
												{errors.password}
											</div>
										)}
								</Grid.Column>
							</Grid>
						</Container>
					)}
				/>
			</div>
		);
	}
}

export default withApollo(LoginForm);
