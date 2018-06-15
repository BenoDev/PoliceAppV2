import React from "react";

import NavBarDesktop from "./navBarDesktop";
import NavBarMobile from "./navBarMobile";

export default props => (
	<div>
		<NavBarDesktop {...props} />
		<NavBarMobile {...props} />
	</div>
);
