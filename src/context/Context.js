import React, { useReducer } from 'react'
import { findIndex } from 'lodash'
import {
	getPatientPrioritiesApi,
	setPatientPriorityApi
} from '../api/api'

const reducer = (state, action) => {
	let result = {
		...state
	}
	switch (action.type) {
		//GET Patients
		case 'get-patient-priorities-start':
			result.isLoading = true
			break
		case 'get-patient-priorities-finish':
			result.isLoading = false
			result.patients = action.payload
			break
		case 'get-patient-priorities-error':
			result.isLoading = false
			result.patients = action.payload
		break
	
				//Save patient priority
		case 'set-patient-priority-start':
			result.isLoading = true
			break
		case 'set-patient-priority-finish':
			result.isLoading = false
			result.patients[findIndex(result.patients, {patientId: action.payload.patientId})] = action.payload
			break
		case 'set-patient-priority-error':
			result.isLoading = false
			result.error = action.payload
		break
	}
}

const initialState = {
	isLoading: false,
	error: null,
	patients: null,
	policyPreference: "5efbb8e20e20780692fb71af"
}

// A C T I O N S
//Get Patients
const getPatientPrioritiesStartAction = () => ({ type: 'get-patient-priorities-start' })
const getPatientPrioritiesFinishAction = responses => ({ type: 'get-patient-priorities-finish',
	payload: responses })
const getPatientPrioritiesErrorAction = error => ({ type: 'get-patient-priorities-error',
	payload: error })
// Set Patients
const setPatientPriorityStartAction = () => ({ type: 'set-patient-priority-start' })
const setPatientPriorityFinishAction = (response) => ({ type: 'set-patient-priority-finish',
	payload: response })
const setPatientPriorityErrorAction = (error) => ({ type: 'set-patient-priority-error',
	payload: error })

	// GET PATIENTS API FUNCTIONS
const getPatientPriorities = (state, dispatch) => {
	console.log('GET RAN')
	dispatch(getPatientPrioritiesStartAction())
  getPatientPrioritiesApi()
  // getPatientPrioritiesApi(state.filters.physician, state.filters.priority, state.filters.surveyCompletion)
    .then((response) => {
			console.log(response, 'response from context')
      dispatch(getPatientPrioritiesFinishAction(response))
    })
    .catch((e) => {
      dispatch(getPatientPrioritiesErrorAction(e))
    })
}

const setPatientPriority = (state, dispatch, patientId, priority) => {
  dispatch(setPatientPriorityStartAction())
  setPatientPriorityApi(patientId, priority, state.policyPreference)
    .then((response) => {
      dispatch(setPatientPriorityFinishAction(response))
    })
    .catch((e) => {
      dispatch(setPatientPriorityErrorAction(e))
    })
}

const initState = () => initialState
const Context = React.createContext({})
function ContextProvider(props) {
	const [state, dispatch] = useReducer(reducer, undefined, initState)

	return (
		<Context.Provider value={{state, dispatch}}>
			{props.children}
		</Context.Provider>
	)
}

export {
	Context,
	ContextProvider,
	getPatientPriorities,
	setPatientPriority
}