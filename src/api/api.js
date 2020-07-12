// async function getPatientPrioritiesApi (userIds, priorityIds, surveyCompletionIds) {
async function getPatientPrioritiesApi () {
  // const url = `/api/v1/intelligent-scheduling/patients`
  const url = `/patients.json`
  // let queryString = ''

  // if (userIds && Array.isArray(userIds))
  //   userIds.forEach((userId, idx) => {
  //     queryString += `userId[${idx}]=${userId}&` // normally should "url-encode" this but since its always integers its fine
	// 	})
		
	// if (priorityIds && Array.isArray(priorityIds)){
	// 	priorityIds.forEach((priorityId, idx) => {
	// 		queryString += `priorityId[${idx}]=${priorityId}&`
	// 	})
	// }

	// if (surveyCompletionIds && Array.isArray(surveyCompletionIds)){
	// 	surveyCompletionIds.forEach((completionId, idx) => {
	// 		queryString += `completionId[${idx}]=${completionId}&`
	// 	})
	// }

  // // trim if necessary
  // if (queryString[queryString.length - 1] === '&')
  //   queryString = queryString.slice(0, -1) // trim off the last '&'


	// 	console.log(queryString, 'QUERY STRING')
  // return fetch(url + '?' + queryString, {
  return fetch(url, {
		method: 'GET'
  }).then(response => {
		console.log(response, "RESPONSE")
    return response.json()
  })
}

async function setPatientPriorityApi (patientId, priority, policyId) {
  const url = `https://intelligent-scheduler.d4.docvisor.com/api/v1/intelligent-scheduling/patients/${patientId}`

  return fetch(url, {
    method: 'PUT',
    headers: {
			'Content-Type': 'application/json'
		},
    body: JSON.stringify({
      policyId: policyId,
      priority: priority
    })
  }).then(response => {
    return response.json()
  })
}

export {
	getPatientPrioritiesApi,
	setPatientPriorityApi
}