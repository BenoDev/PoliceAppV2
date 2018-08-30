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
				width: "auto"
			}}
		>
			<Header
				size="huge"
				style={{
					display: "inline-block",
					margin: "0",
					fontSize: "3rem",
					color: "white",
					fontWeight: "300",
					borderTop: "2px solid white",
					borderBottom: "2px solid white",
					padding: "0.5rem",
					marginBottom: "1rem"
				}}
			>
				Il Mio Logo
			</Header>
			<Header
				size="medium"
				style={{
					margin: "0",
					fontSize: "1.3rem",
					color: "white",
					fontWeight: "300",
					maxWidth: "60%",
					lineHeight: "2rem"
				}}
			>
				Scopri il fantastico mondo delle armi. Fantastiche offerte ed
				articoli
			</Header>
			<Link to="/shop">
				<button className="hero-section__button">Vai al negozio</button>
			</Link>
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
