import React, { Component } from "react";
import $ from "jquery";
import { getHeight, getWidth, getRightMargin } from "./cssPropertyHandler";

class VisualizeSortingStep extends Component {
	componentDidUpdate(prevProps) {
		const { currentSortingStep } = this.props;

		if (currentSortingStep === prevProps.currentSortingStep) {
			return;
		}

		const { array } = this.props;

		this.adjustCurrentStep(array);

		if ("swap" in currentSortingStep) {
			const indexI = currentSortingStep.swap[0];
			const indexJ = currentSortingStep.swap[1];
			this.addAnimation(indexI, indexJ, array);
		}
	}

	adjustCurrentStep(array) {
		for (let i = 0; i < array.length; i++) {
			const id = this.getArrayBarId(i);
			$(id).css({ height: getHeight(array[i]) });
			$(id).children().eq(0).text(array[i]);
		}
	}

	addTemporaryArrayBar(index, array) {
		const id = this.getArrayBarId(index);
		const position = $(id).position();

		const div = $(id).clone();
		div.attr("id", "temp" + index);
		div.css({
			left: position.left,
			top: position.top,
			background: this.getBackgroundColor(index),
			position: "absolute",
		});
		div.children("div").eq(0).text(array[index]);
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
			background: this.getBackgroundColor(index),
			height: `${getHeight(value)}px`,
		});
		$(id).children().eq(0).text(value);
	}

	addAnimation(indexI, indexJ, array) {
		this.addTemporaryArrayBar(indexI, array);
		this.addTemporaryArrayBar(indexJ, array);

		this.invisibleArrayBar(indexI);
		this.invisibleArrayBar(indexJ);

		const idI = this.getArrayBarId(indexI);
		const idJ = this.getArrayBarId(indexJ);

		const leftPosOfI = $(idI).position().left;
		const leftPosOfJ = $(idJ).position().left;

		const { playbackSpeed } = this.props;

		$("#temp" + indexI).animate({ left: leftPosOfJ + "px" }, playbackSpeed);
		$("#temp" + indexJ).animate({ left: leftPosOfI + "px" }, playbackSpeed);

		setTimeout(() => {
			this.visibleArrayBar(indexI, array[indexJ]);
			this.visibleArrayBar(indexJ, array[indexI]);

			this.removeTemporaryArrayBar(indexI);
			this.removeTemporaryArrayBar(indexJ);
		}, playbackSpeed);
	}

	getArrayBarId(index) {
		return "#arrayBar" + index;
	}

	getBackgroundColor(index) {
		const { currentSortingStep } = this.props;

		if (
			"sortedIndices" in currentSortingStep &&
			currentSortingStep.sortedIndices.includes(index)
		) {
			return "#A1C084";
		} else if (
			"comparison" in currentSortingStep &&
			currentSortingStep.comparison.includes(index)
		) {
			return "#6caccf";
		} else if ("swap" in currentSortingStep && currentSortingStep.swap.includes(index)) {
			return "#6caccf";
		} else {
			return "gray";
		}
	}

	render() {
		const { array } = this.props;
		const width = getWidth(array);

		return (
			<div style={{ position: "relative" }}>
				{array.map((value, index) => (
					<div
						key={index}
						id={"arrayBar" + index}
						className="array-bar"
						style={{
							height: `${getHeight(value)}px`,
							width: `${width}%`,
							background: this.getBackgroundColor(index),
							marginRight: `${getRightMargin(array, index)}%`,
						}}>
						<div className="bar-text">{value}</div>
					</div>
				))}
			</div>
		);
	}
}

export default VisualizeSortingStep;
