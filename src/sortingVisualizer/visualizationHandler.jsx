import React, { Component } from "react";
import BubbleSortVisualizationController from "./bubbleSortVisualizationController";
import SelectionSortVisualizationController from "./selectionSortVisualizationController";
import InsertionSortVisualizer from "./insertionSortVisualizer";
import CountingSortVisualizationController from "./countingSortVisualizationController";
import MergeSortVisualizationController from "./mergeSortVisualizationController";
import VisualizationController from "./visualizationController";
import ProgressBar from "./progressBar";

class VisualizationHandler extends Component {
	constructor() {
		super();

		this.state = {
			array: [],
			sortingSteps: [],
			sortingStepIndex: -1,
			currentSortingStep: {},
			timeoutIds: [],
		};
	}

	componentDidUpdate(prevProps) {
		const { array, sortingSteps } = this.props;

		if (prevProps.array !== array) {
			this.setState({ array });
		}
		if (prevProps.sortingSteps !== sortingSteps) {
			this.clearTimeoutIds();
			this.setState({ sortingSteps, sortingStepIndex: sortingSteps.length ? 0 : -1 });
		}
	}

	changeState = (array, sortingStepIndex, currentSortingStep) => {
		this.setState({ array, sortingStepIndex, currentSortingStep });
	};

	addTimeoutIdToState = (timeoutId) => {
		const timeoutIds = [...this.state.timeoutIds];
		timeoutIds.push(timeoutId);
		this.setState({ timeoutIds });
	};

	clearTimeoutIds = () => {
		this.state.timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
		this.setState({ timeoutIds: [] });
	};

	run = () => {
		const { sortingSteps, sortingStepIndex } = this.state;

		let timer = 0;
		const timeoutIds = [];

		for (let i = sortingStepIndex; i < sortingSteps.length; i++) {
			const timeoutId = setTimeout(() => {
				this.changeState(sortingSteps[i].array, i, sortingSteps[i]);
			}, timer);
			timeoutIds.push(timeoutId);
			timer += this.props.playbackSpeed;
		}

		const timeoutId = setTimeout(this.clearTimeoutIds, timer);
		timeoutIds.push(timeoutId);

		this.setState({ timeoutIds });
	};

	play = () => {
		this.run();
	};

	pause = () => {
		this.clearTimeoutIds();
	};

	replay = () => {
		setTimeout(() => {
			this.clearTimeoutIds();

			const { sortingSteps } = this.state;
			this.changeState(sortingSteps[0].array, 0, sortingSteps[0]);
			this.run();
		}, 0);
	};

	playForward = () => {
		this.clearTimeoutIds();

		const { sortingStepIndex, sortingSteps } = this.state;

		if (sortingStepIndex < sortingSteps.length - 1) {
			this.changeState(
				sortingSteps[sortingStepIndex + 1].array,
				sortingStepIndex + 1,
				sortingSteps[sortingStepIndex + 1]
			);
		}
	};

	playBack = () => {
		this.clearTimeoutIds();

		const { sortingStepIndex, sortingSteps } = this.state;

		if (sortingStepIndex > 0) {
			this.changeState(
				sortingSteps[sortingStepIndex - 1].array,
				sortingStepIndex - 1,
				sortingSteps[sortingStepIndex - 1]
			);
		}
	};

	goToBeginning = () => {
		this.clearTimeoutIds();

		const { sortingSteps } = this.state;

		if (sortingSteps.length) {
			this.changeState(sortingSteps[0].array, 0, {});
		} else {
			this.setState({ currentSortingStep: {} });
		}
	};

	goToEnd = () => {
		this.clearTimeoutIds();

		const { sortingSteps } = this.state;
		const length = sortingSteps.length;

		if (length > 0) {
			this.changeState(sortingSteps[length - 1].array, length - 1, sortingSteps[length - 1]);
		}
	};

	isPlayMode() {
		return this.state.timeoutIds.length !== 0;
	}

	isReplayMode() {
		const { sortingSteps, sortingStepIndex } = this.state;
		return sortingStepIndex !== -1 && sortingStepIndex === sortingSteps.length - 1;
	}

	getProgress() {
		const { sortingSteps, sortingStepIndex } = this.state;

		if (sortingStepIndex <= 0 || !sortingSteps.length) {
			return 0;
		}
		return ((sortingStepIndex + 1) * 100) / sortingSteps.length;
	}

	render() {
		const { array, currentSortingStep } = this.state;

		return (
			<>
				<div className="container-fluid mt-2 mb-2">
					<div className="card bg-dark text-white">
						<div className="card-body">
							{/* <BubbleSortVisualizationController
								array={array}
								currentSortingStep={currentSortingStep}
								playbackSpeed={this.props.playbackSpeed}
							/> */}
							<SelectionSortVisualizationController
								array={array}
								currentSortingStep={currentSortingStep}
								playbackSpeed={this.props.playbackSpeed}
							/>
							{/* <InsertionSortVisualizer
								array={array}
								currentSortingStep={currentSortingStep}
								playbackSpeed={this.props.playbackSpeed}
							/> */}
							{/* <CountingSortVisualizationController
								array={array}
								currentSortingStep={currentSortingStep}
								playbackSpeed={this.props.playbackSpeed}
								addTimeoutIdToState={this.addTimeoutIdToState}
							/> */}
							{/* <MergeSortVisualizationController
								array={array}
								currentSortingStep={currentSortingStep}
								playbackSpeed={this.props.playbackSpeed}
								addTimeoutIdToState={this.addTimeoutIdToState}
							/> */}
							<ProgressBar progress={this.getProgress()} />
							<VisualizationController
								play={this.play}
								pause={this.pause}
								replay={this.replay}
								playForward={this.playForward}
								playBack={this.playBack}
								goToBeginning={this.goToBeginning}
								goToEnd={this.goToEnd}
								isPlayMode={this.isPlayMode()}
								isReplayMode={this.isReplayMode()}
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default VisualizationHandler;
