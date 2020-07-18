import React, { useState } from 'react';
import FilterBadge from './components/FilterBadge/FilterBadge'
import { zipObject } from 'lodash'
import './App.scss';

function App() {

	const [value, setValue] = useState([]);

	const physicians = [
		{
			id: 1883,
			name: "Kelly Anderson",
			practiceId: 76827
		},
		{
			id: 1887,
			name: "Simonetta Vespucci",
			practiceId: 76827
		}
	];

	console.log('value from app', value)

	return (
		<div id='app'>
			<FilterBadge
				title={"Physician"}
				options={zipObject(physicians.map((row) => row.id), physicians.map((row) => row.name))}
				primaryColor={"var(--purpleDeep)"}
				secondaryColor={"var(--lavender)"}
				value={value}
				setValue={setValue}
			/>
		</div>
	)
}

export default App;
