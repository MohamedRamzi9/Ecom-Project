
// this is a wrapper class to create ui elements in javascript
// it is a simple class that wraps around the html element class
export class element {
	// creates a new html element
	// if tagName is null, the element is not initialized
	// else the element is initialized with a new html element with tagName
	constructor(tagName='div') {
		if (tagName == null) 
			this._elem = null;
		else
			this._elem = document.createElement(tagName);
	} 
	// returns true if the element is not initialized
	is_null() {
		return this._elem == null;
	}

	// sets the inner element to elem
	elem(elem) {
		this._elem = elem;
		return this;
	}
	// gets the inner element
	get_elem() {
		return this._elem;
	}

	// sets the id of the element
	id(id) {
		this._elem.id = id;
		return this;
	}
	// gets the id of the element
	get_id() {
		return this._elem.id;
	}

	// sets the text of the element
	text(text) {
		this._elem.innerText = text;
		return this;
	}
	// gets the text of the element
	get_text() {
		return this._elem.innerText;
	}

	// sets the value of the element
	value(value) {
		this._elem.value = value;
		return this;
	}
	// gets the value of the element
	get_value() {
		return this._elem.value;
	}

	// sets the placeholder of the element
	placeholder(placeholder) {
		this._elem.placeholder = placeholder;
		return this;
	}

	// sets the name of the element
	name(name) {
		this._elem.name = name;
		return this;
	}
	// gets the name of the element
	get_name() {
		return this._elem.name;
	}

	// sets the type of the element
	type(type) {
		this._elem.type = type;
		return this;
	}
	// gets the type of the element
	get_type() {
		return this._elem.type;
	}

	// sets the given attribute of the element
	attr(name, value) {
		this._elem.setAttribute(name, value);
		return this;
	}
	// gets the given attribute of the element
	get_attr(name) {
		return this._elem.getAttribute(name);
	}
	// sets the selected attribute of the element
	selected(selected) {
		this._elem.selected = selected;
		return this;
	}
	// gets the selected attribute of the element
	get_selected() {
		return this._elem.selected;
	}

	// sets the checked attribute of the element
	checked(checked) {
		this._elem.checked = checked;
		return this;
	}
	// gets the checked attribute of the element
	get_checked() {
		return this._elem.checked;
	}

	// clears the inner html of the element
	clear() {
		this._elem.innerHTML = '';
		return this;
	}

	// sets the inner html of the element
	html(html) {
		this._elem.innerHTML = html;
		return this;
	}

	// adds an event listener to the element
	event(event, func) {
		this._elem.addEventListener(event, func);
		return this;
	}

	// sets the first child of the element
	first_child(child) {
		this._elem.firstChild = child.get_elem();
		return this;
	}
	// gets the first child of the element
	get_first_child() {
		return to_element(this._elem.firstChild);
	}
	// sets the last child of the element
	last_child(child) {
		this._elem.lastChild = child.get_elem();
		return this;
	}
	// gets the last child of the element
	get_last_child() {
		return to_element(this._elem.lastChild);
	}

	// gets a child by index
	get_child_at(index) {
		let children_count = this.get_children_count();
		if (index < 0) index = children_count + index; 
		return to_element(this._elem.children[index]);
	}

	// gets all children of the element
	get_children() {
		return [...this._elem.children].map(elem => to_element(elem));
	}

	// appends a child element to the element
	// the child element must be an instance of this class
	add_child(child) {
		this._elem.appendChild(child.get_elem());
		return this;
	}
	pop_child() {
		this._elem.removeChild(this._elem.lastChild);
		return this;
	}
	// appends a list of children to the element
	// the children must be instances of this class
	add_children(children) {
		for (let child of children) {
			this.add_child(child);
		}
		return this;
	}
	// replaces a child element with a new child element
	// the child element must be an instance of this class
	replace_child(oldChild, newChild) {
		this._elem.replaceChild(newChild.get_elem(), oldChild.get_elem());
		return this;
	}
	// rmeoves a child element by index
	remove_child_at(index) {
		this._elem.removeChild(this._elem.children[index]);
		return this;
	}
	// removes a child element from the element
	// the child element must be an instance of this class
	remove_child(child) {
		this._elem.removeChild(child.get_elem());
		return this;
	}

	// insert a child element at a specific index
	insert_child_at(index, child) {
		this._elem.insertBefore(child.get_elem(), this.get_child_at(index).get_elem());
		return this;
	}
	// insert a child element before another child element
	insert_child_before(child, beforeChild) {
		this._elem.insertBefore(child.get_elem(), beforeChild.get_elem());
		return this;
	}
	// insert a child element after another child element
	insert_child_after(child, afterChild) {
		this._elem.insertBefore(child.get_elem(), afterChild.get_elem().nextSibling);
		return this;
	}

	// get the number of children of the element
	get_children_count() {
		return this._elem.children.length;
	}

	// add this element as a child to another element
	parent(parent) {
		parent.add_child(this);
		return this;
	}
	// get the parent of this element
	get_parent() {
		return to_element(this._elem.parentNode);
	}
	// removes this element from its parent
	remove_parent() {
		let parent = this.get_parent();
		if (!parent.is_null()) {
			parent.remove_child(this);
		}
		return this;
	}
	// swaps the parent of this element with another element
	swap_parent(newParent) {
		let parent = this.get_parent();
		if (!parent.is_null()) {
			parent.remove_child(this);
		}
		this.parent(newParent);
		return this;
	}

	// adds a class to the element
	add_class(className) {
		this._elem.classList.add(className);
		return this;
	}
	// adds a list of classes to the element
	add_classes(classNames) {
		for (let className of classNames)
			this.add_class(className);
		return this;
	}
	// removes a class from the element
	remove_class(className) {
		this._elem.classList.remove(className);
		return this;
	}
	// clears all classes from the element
	clear_classes() {
		this._elem.className = '';
		return this;
	}

	// gets the first element by query from _elem
	get_element_by_query(query) {
		return to_element(this._elem.querySelector(query));
	}

	// gets all elements by query from _elem
	get_elements_by_query(query) {
		return [...this._elem.querySelectorAll(query)]
			.map(elem => to_element(elem));
	}

	// gets all elements by class from _elem
	get_elements_by_class(className) {
		return [...this._elem.getElementsByClassName(className)]
			.map(elem => to_element(elem));
	}

	// gets all elements by tag from _elem
	get_elements_by_tag(tagName) {
		return [...this._elem.getElementsByTagName(tagName)]
			.map(elem => to_element(elem));
	}

	// gets all elements by name from _elem
	get_elements_by_name(name) {
		return [...this._elem.geteleme(name)]
			.map(elem => to_element(elem));
	}

	// sets the style of the element
	style(style) {
		for (let key in style) {
			this._elem.style[key] = style[key];
		}
		return this;
	}
}

// a helper function creating new element
// equivilant to : new element(tagName)
export function elem(tagName='div') {
	return new element(tagName);
}
export let div = () => elem('div');
export let button = () => elem('button');
export let input = () => elem('input');
export let style = () => elem('style');
export let label = () => elem('label');
export let select = () => elem('select');
export let option = () => elem('option');

// a helper function to convert an html element to an element object
// equivilant to : new element().elem(elem)
export function to_element(elem) {
	return new element(null).elem(elem);
}

// gets the body element
export function get_body() {
	return to_element(document.body);
}
// gets the head element
export function get_head() {
	return to_element(document.head);
}

// gets an element by id from the document
export function get_element_by_id(id) {
	return to_element(document.getElementById(id));
}

// gets the first element by query from the document and returns it as an element object
export function get_element_by_query(query) {
	return to_element(document.querySelector(query));
}


// gets all elements by query from the document and returns them as an array of element objects
export function get_elements_by_query(query) {
	return [...document.querySelectorAll(query)]
		.map(elem => to_element(elem));
}

// gets all elements by class from the document and returns them as an array of element objects
export function get_elements_by_class(className) {
	return [...document.getElementsByClassName(className)]
		.map(elem => to_element(elem));
}

// gets all elements by tag from the document and returns them as an array of element objects
export function get_elements_by_tag(tagName) {
	return [...document.getElementsByTagName(tagName)]
		.map(elem => to_element(elem));
}

// gets all elements by name from the document and returns them as an array of element objects
export function get_elements_by_name(name) {
	return [...document.getElementsByName(name)]
		.map(elem => to_element(elem));
}

// runs the function when the page loads
export function on_page_load(func) {
	window.onload = func;
}
	