
function empty() {}


export class websocket {
	constructor() {
		this._on_message = empty;
		this._on_open = empty;
		this._on_close = empty;
		this._uri = null;
	}

	uri(uri) { this._uri = uri; return this; }
	on_message(on_message) { this._on_message = on_message; return this; }
	on_open(on_open) { this._on_open = on_open; return this; }
	on_close(on_close) { this._on_close = on_close; return this; }

	connect() {
		let ws = new WebSocket('ws://' + this._uri);
		ws.onopen = this._on_open;
		ws.onmessage = this._on_message;
		ws.onclose = this._on_close;
		return ws;
	}
}

