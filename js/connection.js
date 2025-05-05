import {websocket} from '../Lib/UI/WebSocket.js'; 
import * as constants from './constants.js';


export class WebSocket {
	static ws = null;

	static Home = null;
	static App = null;

	static init(App, Home) {
		WebSocket.App = App;
		WebSocket.Home = Home;

		WebSocket.ws = new websocket().uri('localhost:9001')
		.on_message((event) => WebSocket.on_message(JSON.parse(event.data)))
		.on_open(() => {
			console.log('WebSocket connection opened');
		}).on_close(() => {
			console.log('WebSocket connection closed');
		}).connect();
	}

	static send(data) {
		WebSocket.ws.send(data);
	}
	
	static on_message(data) {
		console.log("Message received: ", data);
		for (let response of data) {
			if (response.response === constants.SUCCESS) {
				WebSocket.App.show_home();
				console.log("Login successeful");
			} else if (response.response === constants.PRODUCTS) {
				console.log("Products: ", response.products);
				WebSocket.Home.show_result(response.products);
			}
		}
	}
}

