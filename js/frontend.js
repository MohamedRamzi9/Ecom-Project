import * as dom from '../Lib/UI/Dom.js';
import * as url from '../Lib/UI/URL.js';

import {WebSocket} from './connection.js';
import {Login, Signin} from './login.js';
import {Home} from './home.js';
import {Welcome} from './welcome.js';
import {App} from './app.js';






function on_pop_state(event) {
	let pathname = url.path();
	console.log(pathname);
	if (pathname == "home.html") {
		App.show_welcome();
	} else if (pathname == "login") {
		App.show_login();
	}
}


function init_ui() {
	
	let head = dom.get_head();
	let body = dom.get_body();
	
	App.init(body, Login, Signin, Home, Welcome);
	Login.init(App, WebSocket);
	Signin.init(App, WebSocket);
	Home.init(App, WebSocket);
	Welcome.init(App);

	App.show_home();

}


dom.on_page_load(() => {

	WebSocket.init(App, Home);
	init_ui();

});