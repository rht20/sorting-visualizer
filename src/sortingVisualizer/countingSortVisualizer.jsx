import React, { Component } from "react";
import $ from "jquery";
import { getHeight, getWidth, getMarginRight } from "./cssPropertyHandler";

class CountingSortVisualizer extends Component {
	componentDidUpdate(prevProps) {
		const { currentSortingStep } = this.props;

		if (currentSortingStep === prevProps.currentSortingStep) {
			return;
		}

		const { array } = this.props;

		this.adjustCurrentStep(array, currentSortingStep);

		if ("storeCount" in currentSortingStep) {
			const { storeCount } = currentSortingStep;
			this.addStoreCountAnimation(storeCount[0], storeCount[1], array);
		} else if ("placeAtSortedArray" in currentSortingStep) {
			const { placeAtSortedArray } = currentSortingStep;
			this.addPlaceAtSortedArrayAnimation(
				placeAtSortedArray[0],
				placeAtSortedArray[1],
				array
			);
		}
	}

	adjustCurrentStep(array, currentSortingStep) {
		const maxValue = this.getMaxValue();

		for (let i = 0; i < array.length; i++) {
			const id = this.getArrayBarId(i);
			$(id).css({
				height: getHeight(array[i]),
				background: this.getBackgroundColorOfArrayBar(i),
				marginTop: `${maxValue - array[i]}px`,
			});
			$(id).children("div").eq(0).text(this.getArrayBarValue(i));
		}

		if ("counts" in currentSortingStep) {
			const { counts } = currentSortingStep;
			for (let i = 0; i < counts.length; i++) {
				$(this.getCountsArrayBarId(i)).css({
					background: counts[i] ? "#6caccf" : "gray",
				});
				$(this.getCountsArrayCountBarId(i)).children("div").eq(0).text(counts[i]);
			}
		}
	}

	addTemporaryArrayBar(index, value, isArrayBar) {
		const id = isArrayBar ? this.getArrayBarId(index) : this.getCountsArrayBarId(index);
		const position = $(id).position();

		const div = $(id).clone();
		div.attr("id", "temp" + index);
		div.css({
			left: position.left,
			top: position.top,
			background: "#6caccf",
			position: "absolute",
		});
		div.children("div").eq(0).text(value);
		$(".card-body").children("div").eq(0).append(div);
	}

	removeTemporaryArrayBar(index) {
		$("#temp" + index).remove();
	}

	invisibleArrayBar(index) {
		const id = this.getArrayBarId(index);
		$(id).css({ background: "none" });
		$(id).children("div").eq(0).text("");
	}

	visibleArrayBar(index, value) {
		const id = this.getArrayBarId(index);
		$(id).css({
			background: "#A1C084",
			height: `${getHeight(value)}px`,
			marginTop: `${this.getMaxValue() - value}px`,
		});
		$(id).children("div").eq(0).text(value);
	}

	addStoreCountAnimation(indexI, indexJ, array) {
		this.addTemporaryArrayBar(indexI, array[indexI], true);
		this.invisibleArrayBar(indexI);

		const idJ = this.getCountsArrayBarId(indexJ);
		const posOfJ = $(idJ).position();

		const { counts } = this.props.currentSortingStep;

		const { playbackSpeed } = this.props;

		$("#temp" + indexI).animate(
			{
				left: posOfJ.left + "px",
				top: posOfJ.top + "px",
				width: getWidth(counts),
			},
			playbackSpeed
		);

		setTimeout(() => {
			this.removeTemporaryArrayBar(indexI);
		}, playbackSpeed);
		const timeoutId = setTimeout(() => {
			$(idJ).css({ background: "#6caccf" });
			$(this.getCountsArrayCountBarId(indexJ))
				.children("div")
				.eq(0)
				.text(counts[indexJ] + 1);
		}, playbackSpeed);
		this.props.addTimeoutIdToState(timeoutId);
	}

	addPlaceAtSortedArrayAnimation(indexI, indexJ, array) {
		this.addTemporaryArrayBar(indexI, indexI, false);

		const { counts } = this.props.currentSortingStep;

		$(this.getCountsArrayBarId(indexI)).css({
			background: counts[indexI] - 1 ? "#6caccf" : "gray",
		});

		const idJ = this.getArrayBarId(indexJ);
		const posOfJ = $(idJ).position();

		const { playbackSpeed } = this.props;

		$("#temp" + indexI).animate(
			{
				left: posOfJ.left + "px",
				top: posOfJ.top + "px",
				width: getWidth(array),
			},
			playbackSpeed
		);

		setTimeout(() => {
			this.removeTemporaryArrayBar(indexI);
		}, playbackSpeed);
		const timeoutId = setTimeout(() => {
			this.visibleArrayBar(indexJ, indexI);
			$(this.getCountsArrayCountBarId(indexI))
				.children("div")
				.eq(0)
				.text(counts[indexI] - 1);
		}, playbackSpeed);
		this.props.addTimeoutIdToState(timeoutId);
	}

	getMaxValue() {
		const { array, currentSortingStep } = this.props;
		let maxValue = Math.max(...array);

		if ("counts" in currentSortingStep) {
			const { counts } = currentSortingStep;
			return Math.max(maxValue, counts.length - 1);
		}
		return maxValue;
	}

	getArrayBarValue(index) {
		const { array, currentSortingStep } = this.props;
		if ("currentIndex" in currentSortingStep) {
			return index < currentSortingStep.currentIndex ? "" : array[index];
		} else if ("sortedIndices" in currentSortingStep) {
			return currentSortingStep.sortedIndices.includes(index) ? array[index] : "";
		}
		return array[index];
	}

	getArrayBarId(index) {
		return "#arrayBar" + index;
	}

	getCountsArrayBarId(index) {
		return "#countsArrayBar" + index;
	}

	getCountsArrayCountBarId(index) {
		return "#countsArrayCountBar" + index;
	}

	getBackgroundColorOfArrayBar(index) {
		const { currentSortingStep } = this.props;

		if ("currentIndex" in currentSortingStep && index < currentSortingStep.currentIndex) {
			return "none";
		} else if ("sortedIndices" in currentSortingStep) {
			return currentSortingStep.sortedIndices.includes(index) ? "#A1C084" : "none";
		} else if (
			("storeCount" in currentSortingStep && currentSortingStep.storeCount[0] === index) ||
			("placeAtSortedArray" in currentSortingStep &&
				currentSortingStep.placeAtSortedArray[1] === index)
		) {
			return "#6caccf";
		} else {
			return "gray";
		}
	}

	render() {
		const { array, currentSortingStep } = this.props;
		let counts = [];
		if ("counts" in currentSortingStep) {
			counts = currentSortingStep.counts;
		}

		const widthOfArrayBar = getWidth(array);
		const widthOfCountsArrayBar = getWidth(counts);

		const maxValue = this.getMaxValue();

		return (
			<>
				<div style={{ position: "relative" }}>
					{array.map((value, index) => (
						<div
							key={index}
							id={"arrayBar" + index}
							className="array-bar"
							style={{
								height: `${getHeight(value)}px`,
								width: `${widthOfArrayBar}%`,
								background: this.getBackgroundColorOfArrayBar(index),
								marginRight: `${getMarginRight(array, index)}%`,
								marginTop: `${maxValue - value}px`,
							}}>
							<div className="bar-text">{this.getArrayBarValue(index)}</div>
						</div>
					))}

					<div style={{ paddingBottom: counts.length ? 20 : 0 }}></div>

					{counts.map((value, index) => (
						<div
							key={index}
							id={"countsArrayBar" + index}
							className="array-bar"
							style={{
								height: `${getHeight(index)}px`,
								width: `${widthOfCountsArrayBar}%`,
								background: value ? "#6caccf" : "gray",
								marginRight: `${getMarginRight(counts, index)}%`,
							}}>
							<div className="bar-text">{index}</div>
						</div>
					))}

					{counts.map((value, index) => (
						<div
							key={index}
							id={"countsArrayCountBar" + index}
							className="array-bar"
							style={{
								height: `${20}px`,
								width: `${widthOfCountsArrayBar}%`,
								background: "none",
								marginRight: `${getRightMargin(counts, index)}%`,
							}}>
							<div className="bar-text">{value}</div>
						</div>
					))}
				</div>
			</>
		);
	}
}

export default CountingSortVisualizer;
