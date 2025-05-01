
// convert a string to a number
export function int(value) {
	return parseInt(value, 10);
}

// convert a string to a float
export function float(value) {
	return parseFloat(value);
}

// convert a string to a boolean
export function bool(value) {
	return value === 'true' 
}

// convert a value to a string
export function str(value) {
	if (typeof value === 'object') {
		return JSON.stringify(value);
	}
	return value.toString();
}