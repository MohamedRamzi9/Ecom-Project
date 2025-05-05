import * as dom from "../Lib/UI/Dom.js";
import { int, str } from "../Lib/UI/Utils.js";

import * as constants from "./constants.js";


export class Home {
	static ws = null;
	static App = null;
	static WebSocket = null;

	static home_elem = null;
	static content_elem = null;

	static product_card(product) {
		let card = dom.elem("product-card").event("click", () => Home.show_product_details(product));
		dom.elem("image").parent(card).background_image(product.image);

		let info = dom.elem("info").parent(card);
		dom.elem("product-name").parent(info).text(product.name);
		dom.elem("product-price").parent(info).text(product.price);
		return card;
	}
	static show_result(result, type) {
		Home.content_elem.clear();
		for (let e of result) {
			Home.content_elem.add_child(Home.product_card(e));
		}
	}
	static product_details(product) {
		let overlay = dom.elem("overlay");
		let details = dom.elem("product-details").parent(overlay);
		dom.elem("image").parent(details).background_image(product.image);
		dom.elem("info").parent(details).add_children([
			dom.elem("product-name").text(product.name),
			dom.elem("product-price").text("Price: " + str(product.price)),
			dom.button().text("Back").event("click", () => overlay.remove_parent()),
		]);
		return overlay;
	}
	static show_product_details(product) {
		let body = Home.App.get_body();
		body.add_child(Home.product_details(product));
	}
	static search() {
		Home.WebSocket.send({request: constants.PRODUCTS});
	}

	static get_component() {
		return Home.home_elem;
	}

	static create_search_bar() {
		let search_bar = dom.elem("search-bar");
		let search_type = dom.select().parent(search_bar).add_children([
			dom.option().text("Sell").value(constants.SELL),
			dom.option().text("Buy").value(constants.BUY),
		]);
		let search_category = dom.select().parent(search_bar).add_children([
			dom.option().text("All"),
			dom.option().text("Electronics"),
			dom.option().text("Clothing"),
		]);
		let search_input = dom.input().parent(search_bar).placeholder("Search...");
		dom.button().parent(search_bar).text("Search").event("click", () => {
			let search_input_value = search_input.get_value();
			let search_type_value = int(search_type.get_value());
			let search_category_value = search_category.get_value();
			console.log("Search Input: ", search_input_value, " Search Type: ", search_type_value, " Search Category: ", search_category_value);
			Home.search();
		});
		return search_bar;
	}

	static init(App, WebSocket) {
		Home.App = App;
		Home.WebSocket = WebSocket;

		Home.home_elem = dom.elem("home-page");
		let navbar = dom.elem("top-navbar").parent(Home.home_elem);
		dom.elem("button-list").parent(navbar).add_children([
			dom.button().text("Home").parent(navbar).event("click", () => Home.App.show_home()),
			dom.button().text("Logout").parent(navbar).event("click", () => Home.App.show_login()),
		]);

		Home.create_search_bar().parent(navbar);
		
		Home.content_elem = dom.elem("content").parent(Home.home_elem);

	}

}