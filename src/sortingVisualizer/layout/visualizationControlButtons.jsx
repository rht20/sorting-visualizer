import React, { Component } from "react";
import { IconContext } from "react-icons";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";
import { GiPauseButton } from "react-icons/gi";
import { MdReplay } from "react-icons/md";

class VisualizationControlButtons extends Component {
	togglePlayPauseButton = () => {
		const { isPlayMode, play, pause } = this.props;

		if (isPlayMode) {
			pause();
		} else {
			play();
		}
	};

	render() {
		const { isPlayMode, isReplayMode, replay } = this.props;
		const {
			playbackSpeedKeyAndValue,
			currentPlaybackSpeedKey,
			changePlaybackSpeed,
		} = this.props;

		const marginRight = 25;

		return (
			<div style={{ textAlign: "center", marginTop: `${15}px` }}>
				<IconContext.Provider value={{ size: 25 }}>
					<BsFillSkipBackwardFill onClick={() => this.props.goToBeginning()} />
				</IconContext.Provider>

				<div style={{ marginRight: marginRight, display: "inline-block" }}></div>

				<IconContext.Provider value={{ size: 25 }}>
					<IoPlaySkipBack onClick={() => this.props.playBack()} />
				</IconContext.Provider>

				<div style={{ marginRight: marginRight, display: "inline-block" }}></div>

				{isPlayMode && !isReplayMode ? (
					<IconContext.Provider value={{ size: 30 }}>
						<GiPauseButton onClick={() => this.togglePlayPauseButton()} />
					</IconContext.Provider>
				) : (
					""
				)}

				{!isPlayMode && !isReplayMode ? (
					<IconContext.Provider value={{ size: 30 }}>
						<IoPlay onClick={() => this.togglePlayPauseButton()} />
					</IconContext.Provider>
				) : (
					""
				)}

				{isReplayMode ? (
					<IconContext.Provider value={{ size: 30 }}>
						<MdReplay onClick={() => replay()} />
					</IconContext.Provider>
				) : (
					""
				)}

				<div style={{ marginRight: marginRight, display: "inline-block" }}></div>

				<IconContext.Provider value={{ size: 25 }}>
					<IoPlaySkipForward onClick={() => this.props.playForward()} />
				</IconContext.Provider>

				<div style={{ marginRight: marginRight, display: "inline-block" }}></div>

				<IconContext.Provider value={{ size: 25 }}>
					<BsFillSkipForwardFill onClick={() => this.props.goToEnd()} />
				</IconContext.Provider>

				<div style={{ marginRight: marginRight, display: "inline-block" }}></div>

				<div className="dropdown" style={{ display: "inline-block" }}>
					<button
						className="btn btn-secondary dropdown-toggle bg-dark"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false">
						{playbackSpeedKeyAndValue.map((playbackSpeed) =>
							currentPlaybackSpeedKey === playbackSpeed[0]
								? "Speed " + playbackSpeed[1] + "x"
								: ""
						)}
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						{playbackSpeedKeyAndValue.map((playbackSpeed) => (
							<a
								key={playbackSpeed[0]}
								onClick={(event) => {
									event.preventDefault();
									changePlaybackSpeed(playbackSpeed[0]);
								}}
								className="dropdown-item"
								href="">
								{playbackSpeed[1] + "x"}
							</a>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default VisualizationControlButtons;
