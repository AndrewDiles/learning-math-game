const rand = (max, min = 0) => {
	return (Math.floor(Math.random()*(max-min+1)))+min
}
export default rand