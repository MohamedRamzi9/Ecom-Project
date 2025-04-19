
// set value of key in local storage
export function set_local_storage(key, value) {
	localStorage.setItem(key, value);
}

// get value of key in local storage as json
export function get_local_storage(key) {
	return JSON.parse(localStorage.getItem(key));
}

// remove key from local storage
export function remove_local_storage(key) {
	localStorage.removeItem(key);
}

