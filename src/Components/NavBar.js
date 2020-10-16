import React from "react";
import DarkToggle from "./darktoggle"

const NavBar = () => {

	return (
		<div className="NavBar">
			<div className="logo">
				<div >
					<h1>Material-UI-Medium-Blog</h1>
				</div>
			</div>
			<DarkToggle/>
		</div>
	);
};

export default NavBar;
