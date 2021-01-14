import React, { Component } from "react";
import Navbar from "./navbar";
import VisualizationHandler from "./visualizationHandler";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { countingSort } from "./algorithms/countingSort";
import { mergeSortCaller } from "./algorithms/mergeSort";
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
		const max = 99;
		for (let i = 0; i < 10; i++) {
			array.push(Math.floor(Math.random() * max + 1));
		}
		array[0] = 99;
		array[1] = 1;
		this.setState({ array }, this.sort);
	}

	sort() {
		console.log("sort");
		// const sortingSteps = bubbleSort([...this.state.array]);
		// const sortingSteps = selectionSort([...this.state.array]);
		const sortingSteps = insertionSort([...this.state.array]);
		// const sortingSteps = countingSort([...this.state.array]);
		// const sortingSteps = mergeSortCaller([...this.state.array]);
		console.log(sortingSteps);
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
