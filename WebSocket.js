
function empty() {}

// export function websocket(uri, on_message, on_open=empty,  on_close=empty) {
// 	const ws = new WebSocket('ws://' + uri);
// 	ws.onopen = on_open;
// 	ws.onmessage = on_message;
// 	ws.onclose = on_close;
// 	return ws;
// }

export class websocket {
	constructor() {
		this.on_message = empty;
		this.on_open = empty;
		this.on_close = empty;
		this.uri = null;
	}

	uri(uri) { this.uri = uri; return this; }
	on_message(on_message) { this.on_message = on_message; return this; }
	on_open(on_open) { this.on_open = on_open; return this; }
	on_close(on_close) { this.on_close = on_close; return this; }

	connect() {
		let ws = new WebSocket('ws://' + this.uri);
		ws.onopen = this.on_open;
		ws.onmessage = this.on_message;
		ws.onclose = this.on_close;
		return ws;
	}
}

