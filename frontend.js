import {on_page_load} from './Lib/UI/Dom.js';
import {websocket} from './Lib/UI/WebSocket.js'; 

import { init_ui, websocket_class, set_ws } from "./components.js";


let ws = new websocket().uri('localhost:9001')
.on_message(websocket_class.on_message())
.on_open(() => {
	console.log('WebSocket connection opened');
}).on_close(() => {
	console.log('WebSocket connection closed');
}).connect();



on_page_load(() => {
	console.log('Page loaded');

	set_ws(ws);
	init_ui();

});