import * as dom from './Dom.js';


// a simple login form that has a username and password field with a submit button
// it has a get_elem() method
export class login_component {
	full_input_label = (label, input) => dom.div('full-input-label').add_children([
		dom.div('full-label').text(label),
		dom.input('full-input').text(input),
	]);

	constructor() {
		this.login_component = dom.elem('login-component');
		this.username_part = dom.elem('username-part').add_children([
			dom.elem('label').text('Username'),
			dom.input(),
		]).parent(this.login_component);
		this.password_part = dom.elem('password-part').add_children([
			dom.elem('label').text('Password'),
			dom.input(),
		]).parent(this.login_component);
		this.submit_part = dom.button().text('Login').parent(this.login_component);
	}

	// sets the label and placeholder of the username fields
	username(label, input="") {
		this.username_part.get_child_by_index(0).text(label);
		this.username_part.get_child_by_index(1).placeholder(input);
		return this;
	}
	// sets the label and placeholder of the password fields
	password(label, input="") {
		this.password_part.get_child_by_index(0).text(label);
		this.password_part.get_child_by_index(1).placeholder(input);
		return this;
	}
	// sets the label of the submit button
	submit(label) {
		this.submit_part.text(label);
		return this;
	}
	// retuns the value the username input field
	get_username() {
		return this.username_part.get_child_by_index(1).get_value();
	}
	// returns the value of the password input field
	get_password() {
		return this.password_part.get_child_by_index(1).get_value();
	}
	// sets the click event of the submit button
	submit_event(func) {
		this.submit_part.event('click', func);
		return this;
	}

	// sets the error message of the username field
	username_error(text) {
		if (this.username_part.get_children_count() > 2) 
			this.username_part.get_child_by_index(2).text(text);
		else 
			this.username_part.add_child(dom.elem('username-error').text(text));
		return this;
	}
	// sets the error message of the password field
	password_error(text) {
		if (this.password_part.get_children_count() > 2) 
			this.password_part.get_child_by_index(2).text(text);
		else 
			this.password_part.add_child(dom.elem('password-error').text(text));
		return this;
	}
	// clears the errors
	clear_errors() {
		if (this.username_part.get_children_count() > 2) 
			this.username_part.get_child_by_index(2).clear();
		if (this.password_part.get_children_count() > 2) 
			this.password_part.get_child_by_index(2).clear();
		return this;
	}

	// returns the inner html of the login component
	get_elem() { return this.login_component.get_elem(); }

	// css style
	static style = `		
		login-component {
			display: flex;
			flex-direction: column;
			border: 3px solid #000;
			padding: 20px;
			gap: 10px;
			width: 300px;
		}

		username-part, password-part {
			display: flex;
			flex-direction: column;
		}

		button {
			all: unset;
			background-color: green;
			color: white;
			width: 70px;
			text-align: center;
			margin: auto;
			padding: 5px;
			border-radius: 5px;
			cursor: pointer;
			user-select: none;
		}
		
		username-error, password-error {
			color: red;
			font-size: 12px;
		}
	`
}


