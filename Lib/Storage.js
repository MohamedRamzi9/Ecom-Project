

export class LocalStorage {
	static set(key, value) { 
		if (typeof value === 'object') 
			localStorage.setItem(key, JSON.stringify(value));
		else 
			localStorage.setItem(key, value.toString());
	}
	static get_json(key) { return JSON.parse(localStorage.getItem(key)); }
	static get_string(key) { return localStorage.getItem(key); }
	static get_number(key) { return parseFloat(localStorage.getItem(key)); }
	static get_boolean(key) { return localStorage.getItem(key) === 'true'; }

	static remove(key) { localStorage.removeItem(key); }
	static clear() { localStorage.clear(); }

}
