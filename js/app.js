

export class App {
	static Login = null;
	static Signin = null;
	static Home = null;
	static Welcome = null;

	static body_elem = null;

	static init(body_elem, login, signin, home, welcome) {
		App.body_elem = body_elem;
		App.Login = login;
		App.Signin = signin;
		App.Home = home;
		App.Welcome = welcome;
	}
	static show_login() {
		App.body_elem.clear();
		App.body_elem.add_child(App.Login.get_component());
	}
	static show_home() {
		App.body_elem.clear();
		App.body_elem.add_child(App.Home.get_component());
	}
	static show_welcome() {
		App.body_elem.clear();
		App.body_elem.add_child(App.Welcome.get_component());
	}
	static show_signin() {
		App.body_elem.clear();
		App.body_elem.add_child(App.Signin.get_component());
	}

	static get_body() { return App.body_elem;}
}