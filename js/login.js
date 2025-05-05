
import * as dom from "../Lib/UI/Dom.js";
import { login_component as login_component_lib } from "../Lib/UI/Components.js";
import { int, str } from "../Lib/UI/Utils.js";

import { LOGIN, SUCCESS } from "./constants.js";


class login_component_class extends login_component_lib {
	constructor(roles) { 
		super();
		this.role_part = dom.elem("role-part").add_child(dom.div().text("Role"));
		let role_list = dom.elem("role-list").parent(this.role_part);
		roles.forEach((role) => {
			let role_part = dom.elem("radio-part").parent(role_list);
			dom.input().parent(role_part).type("radio").name("role").id(role).value(role).checked(role === roles[0]);
			dom.label().parent(role_part).text(role).attr("for", role);
		});
		console.log(role_list.get_elem());
		this.login_component.insert_child_at(-1, this.role_part);
	}
	get_role() {
		let children = this.role_part.get_child_at(1).get_children();
		let filtered = children.filter((elem) => elem.get_first_child().get_checked());
		let selected = filtered[0].get_first_child().get_value();
		return selected;
	}
	get_all_fields() {
		return [this.get_username(), this.get_password(), this.get_role()];
	}
	get_elem() { return super.get_elem(); }
}



export class Base {
	static ws;
	static App;
	static WebSocket;
}

export class Login extends Base {
	static login_elem = null;

	static login(username, password, role, app) {
		console.log('Username: ', username, ' Password: ', password, ' Role: ', role);
		Login.WebSocket.send({'request': LOGIN, 'username': username, 'password': password, 'role': role});
	}
	static get_component() {
		return Login.login_elem;
	}
	static init(App, WebSocket) {
		Login.App = App;
		Login.WebSocket = WebSocket;

		let login_component = new login_component_class(["admin", "user"]);
		login_component.submit_event(()=>{
			let [username, password, role] = login_component.get_all_fields();
			Login.login(username, password, role, Login.App);		
		});
		Login.login_elem = dom.elem("login-page").add_child(login_component);
	}
}


export class Signin extends Base {
	static signin_elem = null;

	static signin(username, password, role, app) {
		console.log('Username: ', username, ' Password: ', password, ' Role: ', role);
		Login.App.show_welcome();
	}
	static get_component() {
		return Signin.signin_elem;
	}
	static init(App, WebSocket) {
		Signin.App = App;
		Signin.WebSocket = WebSocket;
		
		let signin_component = new login_component_class(["admin", "user"]).submit("Sign Up");
		signin_component.submit_event(()=>{
			let [username, password, role] = signin_component.get_all_fields();
			Signin.signin(username, password, role, Signin.App);		
		});
		Signin.signin_elem = dom.elem("signin-page").add_child(signin_component);
	}
}


