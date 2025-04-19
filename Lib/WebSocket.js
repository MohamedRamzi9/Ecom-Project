
function empty() {}

export function websocket(uri, on_message, on_open=empty,  on_close=empty) {
	const ws = new WebSocket('ws://' + uri);
	ws.onopen = on_open;
	ws.onmessage = on_message;
	ws.onclose = on_close;
	return ws;
}
