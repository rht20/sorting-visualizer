import React from "react";

const Navbar = ({
	sortingAlgorithmsKeyAndName,
	arraySizeKeyAndValue,
	changeSortingAlgorithm,
	changeArraySize,
	currentSortingAlgorithmKey,
	currentArraySizeKey,
	generateRandomArray,
}) => {
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
							{sortingAlgorithmsKeyAndName.map((algo) =>
								currentSortingAlgorithmKey === algo[0] ? algo[1] : ""
							)}
						</div>
						<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							{sortingAlgorithmsKeyAndName.map((algo) => (
								<a
									key={algo[0]}
									onClick={(event) => {
										event.preventDefault();
										changeSortingAlgorithm(algo[0]);
									}}
									className="dropdown-item"
									href="">
									{algo[1]}
								</a>
							))}
						</div>
					</li>
					<li className="nav-item dropdown">
						<div
							className="nav-link dropdown-toggle"
							id="navbarDropdownMenuLink"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false">
							{arraySizeKeyAndValue.map((arraySize) =>
								currentArraySizeKey === arraySize[0]
									? "Array Size " + arraySize[1]
									: ""
							)}
						</div>
						<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							{arraySizeKeyAndValue.map((arraySize) => (
								<a
									key={arraySize[0]}
									onClick={(event) => {
										event.preventDefault();
										changeArraySize(arraySize[0]);
									}}
									className="dropdown-item"
									href="">
									{arraySize[1]}
								</a>
							))}
						</div>
					</li>
					<li className="nav-item">
						<a
							onClick={(event) => {
								event.preventDefault();
								generateRandomArray();
							}}
							className="nav-link"
							href="">
							Generate Random Array
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
