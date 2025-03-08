import { TEMP_STORAGE_KEY } from "./constants.js"

const backToBackQuestion = (query) => {
	const last = window.sessionStorage.getItem(TEMP_STORAGE_KEY);
	if (!last) return false
	return JSON.parse(last) === query
}

export default backToBackQuestion