
import {ToggleButtonLogic} from "./Logics.js";

export function get(source, selector)
{
	return source.querySelector(selector);
}
export function getAll(source, selector)
{
	return source.querySelectorAll(selector);
}
export function getDOM(selector)
{
	return get(document, selector);
}
export function getDOMAll(selector)
{
	return getAll(source, selector);
}




export function create_elem(name)
{
	return document.createElement(name);
}

// export function create_img() { return create_elem("img"); }
// export function create_div() { return create_elem("div"); }
// export function create_input() { return create_elem("input"); }
// export function create_select() { return create_elem("select"); }
// export function create_option() { return create_elem("option"); }

export const HORIZONTAL		= "row";
export const VERTICAL 		= "column";


export class Elem
{

	constructor(name) {
		this.elem = create_elem(name);
		this.data = {};
	}
	get_data(name) { return this.data[name + "-data"]; }
	set_data(name, data) {
		this.data[name + "-data"] = data;
		return this;
	}
	get_style_data(name) { return this.data[name + "-style"]; }
	set_style_data(name, style) {
		this.data[name + "-style"] = style;
		return this;
	}
	get_logic_data(name) { return this.data[name + "-logic"]; }
	set_logic_data(name, logic) {
		this.data[name + "-logic"] = logic;
		return this;
	}


	set(htmlElement) { this.elem = htmlElement; return this; }
	get() { return this.elem; }

	set_style(css)
	{
		for (let [style_name, style_value] of Object.entries(css))
			this.elem.style[style_name] = style_value;
		return this;
	}
	/*
		all numeric values should be passed as strings with the unit
	*/
	set_width(val) { return this.set_style({"width": val}); }
	set_height(val) { return this.set_style({"height": val}); }

	set_color(val) { return this.set_style({"color": val}); }
	set_bgcolor(val) { return this.set_style({"backgroundColor": val}); }
	
	set_border(color="red", width="1px", type="solid") { return this.set_style({"border": type+" "+width+" "+color}); }
	set_border_width(val) { return this.set_style({"borderWidth": val}); }
	set_border_color(val) { return this.set_style({"borderColor": val}); }
	set_border_type(val) { return this.set_style({"borderType": val}); }
	
	set_border_radius(val) { return this.set_style({"borderRadius": val}); }
	set_border_tl_radius(val) { return this.set_style({"borderTopLeftRadius": val}); }
	set_border_tr_radius(val) { return this.set_style({"borderTopRightRadius": val}); }
	set_border_bl_radius(val) { return this.set_style({"borderBottomLeftRadius": val}); }
	set_border_br_radius(val) { return this.set_style({"borderBottomRightRadius": val}); }


	set_chtext() { return this.set_style({"justifyContent": "center", "display": "flex"}); }
	set_cvtext() { return this.set_style({"alignItems": "center", "display": "flex"}); }
	set_nstext() { return this.set_style({"userSelect": "none"}); }
	set_visible(bool) { return this.set_style({"display": bool ? "flex" : "none"}); }
	set_margin(val) { return this.set_style({"margin": val}); }
	set_image(url) { return this.set_style({"backgroundImage": "url("+url+")"}); }
	set_text(text)
	{
		this.elem.textContent = text;
		return this;
	}
	clear()
	{
		this.elem.innerHTML = "";
		return this;
	}
	set_event(ev, handle)
	{
		this.elem.addEventListener(ev, handle);
		return this;
	}
	add_classes(list_of_classes)
	{
		for (let _class of list_of_classes)
		{
			this.elem.classList.add(_class);
		}
		return this;
	}
	remove_classes(list_of_classes)
	{
		for (let _class of list_of_classes)
		{
			this.elem.classList.remove(_class);
		}
		return this;
	}
	swap_classes(to_add, to_remove)
	{
		this.elem.classList.remove(to_remove);
        this.elem.classList.add(to_add);
        return this;
	}

	// getters
	get_text() { return this.elem.textContent; }

}

export class Div extends Elem
{
	static VERTICAL = VERTICAL;
	static HORIZONTAL = HORIZONTAL;

	constructor(name="div") { super(name); }

	add(child)
	{
		this.elem.appendChild(child.get());
		return this;
	}
	add_list(list)
	{
		for (let elem of list)
		{
			this.elem.appendChild(elem.get());
		}
		return this;
	}
	
	flex(direction)
	{
		return this.set_style({"display": "flex", "flexDirection": direction});
	}
	flex_hor() { return this.flex(Div.HORIZONTAL); }
	flex_ver() { return this.flex(Div.VERTICAL); }

	insert(child, index)
	{
		if (index === 0) 
		{
			this.elem.insertBefore(child.get(), this.elem.firstChild);
		}
		else if (index === this.elem.children.length)
		{
			this.elem.appendChild(child);
		}
		else
		{
			this.elem.insertBefore(child.get(), this.elem.children[index]);
		}
		return this;
	}
	remove(child)
	{
		this.elem.removeChild(child.get());
		return this;
	}
	remove_at(index)
	{
		this.elem.removeChild(this.elem.children[index]);
		return this;
	}
	remove_selector(selector)
	{
		return this.remove(get(this, selector));
	}
	get_children(class_array) {
		let children = [];
		for (let i = 0; i < this.elem.children.length; i++)
			children.push(new class_array[i]().set(this.elem.children[i]));
		return children;
	}
	get_child_at(index, Class) {
		return new Class().set(this.elem.children[index]);
	}
	get_child(selector, Class) {
		return new Class().set(get(this.elem, selector));
	}
	
}

export function get_body() { return new Div().set(getDOM("body")); }

export class Input extends Elem
{
	constructor(name="input") { super(name); }
	set_type(type) { this.elem.type = type; return this; }
	set_placeholder(text) { this.elem.placeholder = text; return this; }
	set_value(val) { this.elem.value = val; return this; }

	// getters
	get_value() { return this.elem.value; }
}

export class Button extends Elem
{
	constructor(name="button") { super(name); }
}
export class ToggleButton extends Button
{
	constructor(name="button") { 
		super(name);
	}
	toggle() { this.get_logic_data("toggle").toggle(); return this; }
	get_state() { return this.get_logic_data("toggle").get_state(); }
	set_state(state) { this.get_logic_data("toggle").set_state(state); return this; }
	set_toggle_logic(logic) { 
		this.set_logic_data("toggle", logic)
		.set_event("click", ()=> this.toggle());
		return this;
	}
	get_toggle_logic() { return this.get_logic_data("toggle"); }
}
export class Option extends Elem
/*
	Select interface:
		is_selected(option)
*/
{
	constructor(name="option") { super(name); }
	set_select_callback(callback) { 
		this.set_event("click", callback)
		.set_event("mouseover", ()=> { if (!this.get_logic_data("select").is_selected(this)) this.get_style_data("option-hover").style(this) })
		.set_event("mouseout", ()=> { if (!this.get_logic_data("select").is_selected(this)) this.get_style_data("option-not-hover").style(this) });
		return this;
	}
	set_hover_style(style) { this.set_style_data("option-hover", style); return this; }
	get_hover_style() { return this.get_style_data("option-hover"); }
	set_not_hover_style(style) { this.set_style_data("option-not-hover", style); return this; }
	get_not_hover_style() { return this.get_style_data("option-not-hover"); }

	set_selected_style(style) { this.set_style_data("option-selected", style); return this; }
	get_selected_style() { return this.get_style_data("option-selected"); }
	set_not_selected_style(style) { this.set_style_data("option-not-selected", style); return this; }
	get_not_selected_style() { return this.get_style_data("option-not-selected"); }

}
export class Select extends Div
/*
	Option interface:
		set_select_callback(callback)
		set_logic_data("select", logic)
*/
{
	constructor(name="select") { 
		super(name); 
		this.title = new ToggleButton("title").set_toggle_logic(new ToggleButtonLogic(()=> this.options.set_visible(true), ()=> this.options.set_visible(false)).set_state(true));
		this.add(this.title);
		this.options = new Div("options");
		this.add(this.options);
	}
	set_title(text) { this.title.set_text(text); return this; }
	show_title(bool) { this.title.set_visible(bool); return this; }

	set_select_logic(logic) { this.set_logic_data("select", logic); return this; }
	get_select_logic() { return this.get_logic_data("select"); }
	add_option(option) {
		let logic = this.get_select_logic();
		option.set_select_callback(()=> logic.update(option));
		option.set_logic_data("select", logic);
		this.options.add(option);
		return this;
	} 
	get_selected() { return this.get_logic_data("select").get_selected(); }
}


export class Img extends Elem
{
	constructor(img) { super(img); }
	src(source) { this.elem.src = source; return this;}

}

function init()
{

}

export function onPageLoad(load)
{
	init();
	window.onload = load;
}