import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Button, Segment } from "semantic-ui-react";

export default () => (
	<Container fluid className="hero-section">
		<div
			style={{
				position: "absolute",

				top: "20vh",
				left: "5vw",
				width: "48%"
			}}
		>
			<Header
				size="huge"
				style={{
					margin: "0",
					fontSize: "3.5rem",
					color: "white",
					fontWeight: "300"
				}}
			>
				Lorem ipsum dolor sit ameteligendi
			</Header>
			<button className="hero-section__button" as={Link} to="/shop">
				Vai al negozio
			</button>
		</div>
	</Container>
);

// export default () => {
// 	return (
// 		<section className="hero-section">
// 			<div className="hero-section__text-box">
// 				<h1 className="hero-section__heading">Tutto molto bello</h1>
// 				<p className="hero-section__paragraph">
// 					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
// 					Vero quam, culpa rerum beatae illum laudantium. At quisquam
// 					aperiam pariatur.
// 				</p>
// 				<button className="hero-section__button">Push Me</button>
// 			</div>
// 		</section>
// 	);
// };
