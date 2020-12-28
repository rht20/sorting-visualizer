import React from "react";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<span className="navbar-brand">Sorting Visualizer</span>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item dropdown">
						<div
							className="nav-link dropdown-toggle"
							id="navbarDropdownMenuLink"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false">
							Sorting Algorithm
						</div>
						<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<a className="dropdown-item" href="">
								Action
							</a>
							<a className="dropdown-item" href="">
								Another action
							</a>
							<a className="dropdown-item" href="">
								Something else here
							</a>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
