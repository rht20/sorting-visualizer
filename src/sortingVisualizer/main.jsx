import React, { Component } from "react";
import Navbar from "./navbar";
import VisualizationHandler from "./visualizationHandler";
import { bubbleSort } from "./algorithms/bubbleSort";
import "./css/style.css";

class Main extends Component {
	constructor() {
		super();

		this.state = {
			array: [],
			sortingSteps: [],
			playbackSpeed: 500,
		};
	}

	componentDidMount() {
		console.log("Main - componentDidMount");
		this.resetArray();
	}

	resetArray() {
		console.log("Main - resetArray");
		const array = [];
		for (let i = 0; i < 10; i++) {
			array.push(Math.floor(Math.random() * 99 + 1));
		}
		this.setState({ array }, this.sort);
	}

	sort() {
		console.log("sort");
		const sortingSteps = bubbleSort([...this.state.array]);
		this.setState({ sortingSteps });
	}

	render() {
		console.log("Main - render");

		const { array, sortingSteps, playbackSpeed } = this.state;

		return (
			<>
				<Navbar />
				<VisualizationHandler
					array={array}
					sortingSteps={sortingSteps}
					playbackSpeed={playbackSpeed}
				/>
			</>
		);
	}
}

export default Main;