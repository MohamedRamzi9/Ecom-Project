

// returns a the encoded url as a string from a json object
export function to_string(json) {
	return new URLSearchParams(json).toString();
}

// returns a json object from an encoded url string
export function to_json(string) {
	return Object.fromEntries(new URLSearchParams(string).entries());
}

// returns the pathname of the current url without the leading slash
export function path() {
	return location.pathname.replaceAll("/", '');
}
// returns the full url of the current page
export function url() {
	return location.href;
}

// sets the pathname of the current url without the leading slash
export function goto_path(path) {
	if (path[0] !== '/') 
		path = '/' + path;
	location.pathname = path;
}

// sets the full url of the current page
export function goto_url(url) {
	location.href = url;
}

function format_path(path) {
	if (path[0] !== '/') 
		path = '/' + path;
	return path;
}

// sets the current state of the page, url doesn't have to start with a slash
export function set_state(path, state={}, title='') {
	path = format_path(path);
	history.replaceState(state, title, path);
}

// pushes a new state to the history stack
export function push_state(path, state={}, title='') {
	path = format_path(path);
	history.pushState(state, title, path);
}

// gets the current state of the page
export function get_state() {
	return history.state;
}

// sets the onpopstate event handler that takes the event as an argument
export function on_pop_state(func) {
	window.onpopstate = func;
}