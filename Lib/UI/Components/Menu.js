import * as dom from "../Dom.js";

export class dropdown_component {
	constructor() {
		this.selected_elem = null;
		this.container_elem = dom.elem("dropdown-component");
		this.header_elem = dom.elem("header-part").parent(this.container_elem);
		this.menu_elem = dom.elem("menu-part").parent(this.container_elem);
		this.hidden = false;
	}

	is_hidden() { return this.hidden; }

	add_elem(elem) {
		this.menu_elem.add_child(elem);
	}

	select_elem(elem) {
		this.selected_elem = elem;
	}
	set_header_elem(elem) {
		this.header_elem.clear();
		this.header_elem.add_child(elem);
	}

	get_selected_elem() {
		return this.selected_elem;
	}

	show_menu() {
		this.hidden = false;
		this.menu_elem.height(this.menu_elem._elem.scrollHeight + "px");
	}
	hide_menu() {
		this.hidden = true;
		this.menu_elem.height("0px");
	}
	toggle_menu() {
		if (this.is_hidden()) 
			this.show_menu();
		else 
			this.hide_menu();
	}
	
	get_elem() {
		return this.container_elem.get_elem();
	}

	static style = `
		dropdown-component {
			gap: 20px;
			display: flex;
			flex-direction: column;
			width: fit-content;

			header-part {
				all: unset;
				background-color: lightblue;
				display: flex;
			}
			menu-part {
				display: flex;
				flex-direction: column;
				width: fit-content;
				gap: 10px;
				
				transition: height .3s ease;
				overflow: hidden;

			}
		}
	`;
}
