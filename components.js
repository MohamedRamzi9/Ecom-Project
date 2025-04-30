import { login_component as login_component_lib } from "./Lib/Components.js";
import * as dom from "./Lib/Dom.js";

class login_component_class extends login_component_lib {
	constructor(roles) {
		super();
		this.role_part = dom.elem("role-part").parent(this.login_component).add_child(dom.div().text("Role"));
		let role_list = dom.elem("role-list").parent(this.role_part);
		roles.forEach((role) => {
			role_list.add_child(dom.input().type("radio"));
		});
	}
	get_elem() { return super.get_elem(); }

}

class body_component_class {
	constructor(body) {
		this.login_component = null;
		this.home_component = null;
		this.welcome_component = null;
		this.body = body;
	}
	show_login_component() {
		this.body.clear();
		this.body.add_child(this.login_component);
	}
	show_home_component() {
		this.body.clear();
		this.body.add_child(this.home_component);
	}
	show_welcome_component() {
		this.body.clear();
		this.body.add_child(this.welcome_component);
	}
}








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






function init_login_page(body_component) {
	let login_component = new login_component_class(["admin", "user"]);
	login_component.submit_event(()=>{
		let username = login_component.get_username();
		let password = login_component.get_password(); 
		login(username, password);		
	});
	body_component.login_component = dom.elem("login-page").add_child(login_component);
}

function init_home_page(body_component) {
	let home_component = new dom.elem("home-page").parent(body_component.body);
	body_component.home_component = home_component.add_child(dom.elem("h1").text("Home"));
}

function init_welcome_page(body_component) {
	let welcome_component = new dom.elem("welcome-page").parent(body_component.body);
	body_component.welcome_component = welcome_component
	.add_child(dom.button().text("Login").event('click', () => body_component.show_login_component()))
	.add_child(dom.button().text("Sign Up").event('click', () => body_component.show_signin_component()))
	.add_child(dom.button().text("Home").event('click', () => body_component.show_home_component()));
}


export function init_ui() {
	
	let head = dom.get_head();
	let body = dom.get_body();
	
	let body_component = new body_component_class(body);

	init_login_page(body_component);
	init_home_page(body_component);
	init_welcome_page(body_component);

	body_component.show_welcome_component();

}
