import React from 'react';
import './App.css';
import {ManufacturingForm} from "./components/ManufacturingForm/ManufacturingForm";
import {Card} from "antd";

function App() {
	return (
		<div className="container">
			<Card className="card">
				<ManufacturingForm/>
			</Card>
		</div>
	);
}

export default App;
