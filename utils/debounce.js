let timeout = null
export const debounce = (func, wait, immediate) => {
	var later = () => {
		timeout = null
		func.apply(this)
	}

	clearTimeout(timeout)
	timeout = setTimeout(later, immediate ? 0 : wait)
}
