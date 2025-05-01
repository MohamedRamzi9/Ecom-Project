import { on_page_load } from "../../Dom.js";
import * as dom from "../../Dom.js";
import { login_component } from "../../Components.js";


	



on_page_load(() => {
	dom.get_head().add_child(dom.style().text(login_component.style));

	let body = dom.get_body();

	let login_form = new login_component();
	login_form.submit_event(() => {
		let username = login_form.get_username();
		let password = login_form.get_password();
		login_form.clear_errors();
		if (username == "")
			login_form.username_error("Please fill username");
		if (password == "")
			login_form.password_error("Please fill password");
	});

	body.add_child(login_form);

});
	