import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-dark text-center p-3" style={{ color: "white" }}>
			Designed and built with <FaHeart /> by{" "}
			<a href="https://github.com/rht20" target="_blank" style={{ color: "white" }}>
				MD. Rakibul Hasan
			</a>
		</footer>
	);
};

export default Footer;
