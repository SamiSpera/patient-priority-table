import React from 'react';
import { ContextProvider } from './context/Context'
import Table from './components/Table/Table'
import './App.scss';

function App() {
	return (
		<ContextProvider>
			<div id='app'>
				<Table/>
			</div>
		</ContextProvider>
	)
}

export default App;
