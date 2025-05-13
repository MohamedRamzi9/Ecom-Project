import * as dom from "../Lib/UI/Dom.js";
import { int, str } from "../Lib/UI/Utils.js";

import * as constants from "./constants.js";


export class Home {
	static ws = null;
	static App = null;
	static WebSocket = null;

	static home_elem = null;
	static content_elem = null;

	static ready = false;

	static product_card_component(product) {
		let card = dom.elem("product-card").event("click", () => Home.show_product_details(product));
		dom.elem("image").parent(card).background_image(product.image);

		let info = dom.elem("info").parent(card);
		dom.elem("label-info").parent(info).add_children([
			dom.elem("label").parent(info).text("Name "),
			dom.elem("product-name").parent(info).text(product.name),
		]);
		dom.elem("label-info").parent(info).add_children([
			dom.elem("label").parent(info).text("Price "),
			dom.elem("product-price").parent(info).text(product.price),
		]);
		return card;
	}

	static product_details_component(product) {
		let overlay = dom.elem("overlay");
		let details = dom.elem("product-details").parent(overlay);

		dom.elem("image").parent(details).background_image(product.image);

		let info = dom.elem("info").parent(details);
		dom.elem("name").text(product.name).parent(info);
		dom.elem("label-info").parent(info).add_children([
			dom.elem("label").text("Price "),
			dom.elem("price").text(str(product.price)),
		]);
		dom.elem("label-info").parent(info).add_children([
			dom.elem("label").text("Category "),
			dom.elem("category").text(product.category),
		]);
		dom.elem("label-info").parent(info).add_children([
			dom.elem("label").text("Description "),
			dom.elem("description").text(product.description),
		]);
		dom.button().parent(info).text("Back").event("click", () => overlay.remove_parent());
		return overlay;
	}
	static search_bar_component() {
		let search_bar = dom.elem("search-bar");

		let search_type = dom.select().parent(search_bar).add_children([
			dom.option().text("Sell").value(constants.SELL),
			dom.option().text("Auction").value(constants.AUCTION),
		]);

		let search_category = dom.select().parent(search_bar).add_children([
			dom.option().text("All"),
			dom.option().text("Electronics"),
			dom.option().text("Clothing"),
		]);

		let search_input = dom.input().parent(search_bar).placeholder("Search...");
		
		dom.button().parent(search_bar).text("Search").event("click", () => {
			let name = search_input.get_value();
			let type = int(search_type.get_value());
			let category = search_category.get_value();
			console.log("Search Input: ", name, " Search Type: ", type, " Search Category: ", category);
			Home.search(name, category);
		});
		return search_bar;
	}
	static top_navbar_component() {
		let navbar = dom.elem("top-navbar");
		dom.elem("button-list").parent(navbar).add_children([
			dom.button().text("Home").parent(navbar).event("click", () => Home.App.show_home()),
			dom.button().text("Logout").parent(navbar).event("click", () => Home.App.show_login()),
		]);
		return navbar;
	}

	static show_result(result, type) {
		Home.content_elem.clear();
		for (let e of result) {
			Home.content_elem.add_child(Home.product_card_component(e));
		}
	}
	static show_product_details(product) {
		let body = Home.App.get_body();
		body.add_child(Home.product_details_component(product));
	}
	static search(name, category) {
		Home.WebSocket.send({request: constants.PRODUCTS, name: name, category: category});
	}

	static get_component() {
		return Home.home_elem;
	}

	static is_ready() {
		return Home.ready;
	}

	static init(App, WebSocket) {
		Home.App = App;
		Home.WebSocket = WebSocket;

		Home.home_elem = dom.elem("home-page");
		
		let navbar = Home.top_navbar_component().parent(Home.home_elem);
		Home.search_bar_component().parent(navbar);
		
		Home.content_elem = dom.elem("content").parent(Home.home_elem);

		Home.ready = true;
	}

}