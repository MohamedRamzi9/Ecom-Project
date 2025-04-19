import { login_component as login_component_lib } from "./Lib/Components.js";
import * as dom from "./Lib/Dom.js";

let body = null;
let head = null;

class body_component_class {
	constructor() {
		this.login_component = null;
		this.home_component = null;
		this.welcome_component = null;
	}
	show_login_component() {
		body.clear();
		body.add_child(this.login_component);
	}
	show_home_component() {
		body.clear();
		body.add_child(this.home_component);
	}
	show_welcome_component() {
		body.clear();
		body.add_child(this.welcome_component);
	}
}
let body_component = new body_component_class();







// full functions
function home() {
	console.log('Home');
	body_component.show_home_component();
}

function login(username, password) {
	console.log('Username: ', username, ' Password: ', password);
	if (username === "admin" && password === "admin") {
		home();
	}
}






function init_login_page() {
	let login_component = new login_component_lib();
	login_component.submit_event(()=>{
		let username = login_component.get_username();
		let password = login_component.get_password(); 
		login(username, password);		
	});
	body_component.login_component = dom.elem("login-page").add_child(login_component);
}

function init_home_page() {
	let home_component = new dom.elem("home-page").parent(body);
	body_component.home_component = home_component.add_child(dom.elem("h1").text("Home"));
}

function init_welcome_page() {
	let welcome_component = new dom.elem("welcome-page").parent(body);
	body_component.welcome_component = welcome_component.add_child(dom.elem("h1").text("Welcome to the home page"))
	.add_child(dom.button().text("Login").event('click', () => body_component.show_login_component()))
	.add_child(dom.button().text("Sign Up").event('click', () => body_component.show_signin_component()))
	.add_child(dom.button().text("Home").event('click', () => body_component.show_home_component()));
}


export function init_ui() {

	head = dom.get_head();
	body = dom.get_body();


	init_login_page();
	init_home_page();
	init_welcome_page();

	body_component.show_welcome_component();

}
