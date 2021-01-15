import React from "react";

const ProgressBar = ({ progress }) => {
	return (
		<div className="progress" style={{ height: `${6}px` }}>
			<div
				className="progress-bar"
				role="progressbar"
				style={{ width: `${progress}%`, background: "gray" }}
				aria-valuenow="25"
				aria-valuemin="0"
				aria-valuemax="100"></div>
		</div>
	);
};

export default ProgressBar;
