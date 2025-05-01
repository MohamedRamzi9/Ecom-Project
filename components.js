import { login_component as login_component_lib } from "./Lib/UI/Components.js";
import * as dom from "./Lib/UI/Dom.js";
import { int, str } from "./Lib/UI/Utils.js";

// Constants
const SELL = 0;
const BUY = 1;

const LOGIN = 0;
const SUCCESS = 1;

// WebSocket connection
export class websocket_class {
	static body_component = null;

	static on_message() {
		return (event) => {
			let data = JSON.parse(event.data);
			console.log("Message received: ", data);
			for (let response of data) {
				if (response.response === SUCCESS) {
					websocket_class.body_component.show_home_component();
					console.log("Login successeful");
				}
			}
		};
	}
}
let ws = null;
export function set_ws(new_ws) {
	ws = new_ws;
}



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

class body_component_class {
	constructor(body) {
		this.login_component = null;
		this.home_component = null;
		this.welcome_component = null;
		this.signin_component = null;
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
	show_signin_component() {
		this.body.clear();
		this.body.add_child(this.signin_component);
	}
}

class home_component_class {
	constructor(body_component) {
		this.home = dom.elem("home-page");
		let navbar = dom.elem("top-navbar").parent(this.home);
		dom.elem("button-list").parent(navbar).add_children([
			dom.button().text("Home").parent(navbar).event("click", () => {
				body_component.show_home_component();
			}),
			dom.button().text("Logout").parent(navbar).event("click", () => {
				body_component.show_login_component();
			}),
		]);

		let search_bar = dom.elem("search-bar").parent(navbar);
		let search_type = dom.select().parent(search_bar).add_children([
			dom.option().text("Sell").value(SELL),
			dom.option().text("Buy").value(BUY),
		]);
		let search_category = dom.select().parent(search_bar).add_children([
			dom.option().text("All"),
		]);
		let search_input = dom.input().parent(search_bar).placeholder("Search...");
		dom.button().parent(search_bar).text("Search").event("click", () => {
			let search_input_value = search_input.get_value();
			let search_type_value = int(search_type.get_value());
			let search_category_value = search_category.get_value();
			console.log("Search Input: ", search_input_value, " Search Type: ", search_type_value, " Search Category: ", search_category_value);
			this.show_result(["Result 1", "Result 2", "Result 3"], search_type);
		});
		this.content = dom.elem("content").parent(this.home);

	}

	product_card(name) {
		let card = dom.elem("product-card");
		dom.elem("image").parent(card);
		dom.elem("product-name").parent(card).text(name);
		return card;
	}

	show_result(result, type) {
		this.content.clear();
		for (let e of result) {
			this.content.add_child(this.product_card(e));
		}
	}

	get_elem() { return this.home.get_elem(); }

}





// full functions
function client_home(body_component) {
	console.log('Client Home');
	body_component.show_home_component();
}


function login(username, password, role, body_component) {
	console.log('Username: ', username, ' Password: ', password, ' Role: ', role);
	ws.send(str({'request': LOGIN, 'username': username, 'password': password, 'role': role}));
	// client_home(body_component);
}
function signin(username, password, role, body_component) {
	console.log('Username: ', username, ' Password: ', password, ' Role: ', role);
	body_component.show_welcome_component();
}






function init_login_page(body_component) {
	let login_component = new login_component_class(["admin", "user"]);
	login_component.submit_event(()=>{
		let [username, password, role] = login_component.get_all_fields();
		login(username, password, role, body_component);		
	});
	body_component.login_component = dom.elem("login-page").add_child(login_component);
}
function init_signin_page(body_component) {
	let signin_component = new login_component_class(["admin", "user"]).submit("Sign Up");
	signin_component.submit_event(()=>{
		let [username, password, role] = signin_component.get_all_fields();
		signin(username, password, role, body_component);		
	});
	body_component.signin_component = dom.elem("signin-page").add_child(signin_component);
}

function init_home_page(body_component) {
	body_component.home_component = new home_component_class(body_component);
}

function init_welcome_page(body_component) {
	let welcome_component = new dom.elem("welcome-page").parent(body_component.body);
	body_component.welcome_component = welcome_component
	.add_child(dom.button().text("Login").event('click', () => body_component.show_login_component()))
	.add_child(dom.button().text("Sign Up").event('click', () => body_component.show_signin_component()))
}


export function init_ui() {
	
	let head = dom.get_head();
	let body = dom.get_body();
	
	let body_component = new body_component_class(body);

	websocket_class.body_component = body_component;

	init_login_page(body_component);
	init_signin_page(body_component);
	init_home_page(body_component);
	init_welcome_page(body_component);

	body_component.show_welcome_component();

}
