import * as dom from "../Lib/UI/Dom.js";


export class Welcome {
	static App = null;

	static welcome_elem = null;

	static get_component() {
		return Welcome.welcome_elem;
	}
	
	static init(app) {
		Welcome.App = app;

		Welcome.welcome_elem = new dom.elem("welcome-page").parent(Welcome.App.body_elem)
		.add_child(dom.button().text("Login").event('click', () => Welcome.App.show_login()))
		.add_child(dom.button().text("Sign Up").event('click', () => Welcome.App.show_signin()));
		
	}
}

