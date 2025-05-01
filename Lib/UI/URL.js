

// return a the encoded url as a string from a json object
export function to_string(json) {
	return new URLSearchParams(json).toString();
}

// return a json object from an encoded url string
export function to_json(string) {
	return Object.fromEntries(new URLSearchParams(string).entries());
}