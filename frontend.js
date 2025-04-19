import {on_page_load} from './Lib/Dom.js';
import {websocket} from './Lib/WebSocket.js';

let ws = new websocket().uri('localhost:9001')
.on_message((event) => {
	console.log('Message from server ', event.data);
}).on_open(() => {
	console.log('WebSocket connection opened');
}).on_close(() => {
	console.log('WebSocket connection closed');
}).connect();



on_page_load(() => {
	console.log('Page loaded');


});