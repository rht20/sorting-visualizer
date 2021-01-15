import React, { Component } from "react";
import Navbar from "./layout/navbar";
import VisualizationController from "./visualizationController/visualizationController";
import { bubbleSort } from "./algorithm/bubbleSort";
import { selectionSort } from "./algorithm/selectionSort";
import { insertionSort } from "./algorithm/insertionSort";
import { countingSort } from "./algorithm/countingSort";
import { mergeSortCaller } from "./algorithm/mergeSort";
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
		const max = 20;
		for (let i = 0; i < 10; i++) {
			array.push(Math.floor(Math.random() * max + 1));
		}
		array[0] = 20;
		array[1] = 1;
		this.setState({ array }, this.sort);
	}

	sort() {
		// const sortingSteps = bubbleSort([...this.state.array]);
		// const sortingSteps = selectionSort([...this.state.array]);
		// const sortingSteps = insertionSort([...this.state.array]);
		const sortingSteps = countingSort([...this.state.array]);
		// const sortingSteps = mergeSortCaller([...this.state.array]);

		this.setState({ sortingSteps });
	}

	render() {
		console.log("Main - render");

		const { array, sortingSteps, playbackSpeed } = this.state;

		return (
			<>
				<Navbar />
				<VisualizationController
					array={array}
					sortingSteps={sortingSteps}
					playbackSpeed={playbackSpeed}
				/>
			</>
		);
	}
}

export default Main;
