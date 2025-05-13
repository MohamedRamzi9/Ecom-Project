import * as dom from "../Lib/UI/Dom.js";
import { dropdown_component } from "../Lib/UI/Components/Menu.js";




dom.on_page_load(() => {
	console.log("Page loaded");
	let body = dom.get_body();

	let list = new dropdown_component();
	let values = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10000"];

	let first_elem = null;
	for (let choice of values) {
		let choice_elem = dom.elem("item").text(choice).event("click", () => {
			let selected_elem = list.get_selected_elem();
			if (selected_elem != null) 
				selected_elem.remove_class("selected");
			list.select_elem(choice_elem);
			choice_elem.add_class("selected");

			let copy_elem = choice_elem.clone().event("click", () => list.toggle_menu());
			list.set_header_elem(copy_elem);
		});
		list.add_elem(choice_elem);
		if (first_elem == null)
			first_elem = choice_elem;
	}
	first_elem.click();

	body.add_child(list);
});
