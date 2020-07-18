import React, { useRef, useState, useEffect, useContext } from 'react'
import { Context, getPatientPriorities, setPatientPriority } from '../../context/Context'
import Row from './Row'
import findIndex from './find-index'
import move from 'array-move'
import patientsData from '../../data/patients.json'
import { sortBy, remove, concat } from 'lodash'

const Table = () => {
	const { state, dispatch } = useContext(Context)
	const positions = useRef([]).current
	const setPosition = (i, offset) => (positions[i] = offset)
	const [patients, setPatients] = useState(patientsData)

	// console.log(state.patients)
	// console.log(state, 'STATE')
		// useEffect(() => {
  //   if (state.patients === null && !state.isLoading) {
	// 		getPatientPriorities(state, dispatch)
  //   }
	// }, [state.patients, state.isLoading])

	// useEffect(() => {
	// 	// sort & move unprioritized patients (null) to the bottom
	// 	let sortedPatients = sortBy(patients, [function(p) {return p.priority.priority}]).reverse();
	// 	let unprioritizedPatients = remove(sortedPatients, function(p) {return p.priority.priority === null})
	// 	let finalPatients = concat(sortedPatients, unprioritizedPatients)
	// 	setPatients(finalPatients)
  // }, [patients])

	const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions)
    if (targetIndex !== i) {
			let patient = move(patients, i, targetIndex)
			console.log(patient)
      setPatients(patient)
    }
	}
	
	const moveListener = (i) => {
    const staticOffset = 0.01 // TODO: Ask Tristan about static offsets
    let newPriority
    if (i !== 0 && i !== patients.length - 1)
      newPriority = (patients[i - 1].priority.priority + patients[i + 1].priority.priority) / 2
    else if (i === 0)
      newPriority = patients[i + 1].priority.priority + staticOffset
    else
			newPriority = patients[i - 1].priority.priority - staticOffset
		// kick off the modification
    console.log(newPriority, 'newPriority')
		setPatientPriority(state, dispatch, patients[i].patientId, newPriority)
	}


	if(patients !== null) {
		return (
			<div>
				{patients.map((patient, i) => (
					<Row
						key={patient.name}
						i={i}
						patients={patients}
						patient={patient}
						setPosition={setPosition}
						moveItem={moveItem}
						onMove={moveListener}
					/>
				))}
			</div>
		);
	} else {
		console.log('None')
	}
}
 
export default Table;