
export class ToggleButtonLogic {
	constructor(toggle_true_callback, toggle_false_callback) {
		this.toggled = false;
		this.toggle_true_callback = toggle_true_callback;
		this.toggle_false_callback = toggle_false_callback;
	}

	toggle_true() {
		this.set_state(true).toggle_true_callback();
		return this;
	}
	toggle_false() {
		this.set_state(false).toggle_false_callback();
		return this;
	}
	toggle() {
		if (this.toggled) {
			this.toggle_false();
		} else {
			this.toggle_true();
		}
		return this;
	}
	set_state(state) { this.toggled = state; return this; }
	get_state() { return this.toggled; }
}


export class OneSelectLogic {
	constructor(element_selected_callback, element_unselected_callback, element_swapped_callback) {
		this.selected = null;
		this.element_selected_callback = element_selected_callback;
		this.element_unselected_callback = element_unselected_callback;
		this.element_swapped_callback = element_swapped_callback;
	}
	update(option) {
		if (this.selected === null) {
			this.selected = option;
			this.element_selected_callback(option);
		}
		else {
			if (this.selected === option) {
				this.selected = null;
				this.element_unselected_callback(option);
			}
			else {
				this.element_swapped_callback(option, this.selected);
				this.selected = option;
			}
		}
	}
	get_selected() {
		return this.selected;
	}
	is_selected(option) {
		return this.selected === option;
	}
}

export class ExactlyOneSelectLogic {
	constructor(element_selected_callback, element_swapped_callback) {
		this.selected = null;
		this.element_selected_callback = element_selected_callback;
		this.element_swapped_callback = element_swapped_callback;
	}
	select(option) {
		this.update(option);
		return this;
	}
	update(option) {
		if (this.selected === null) {
			this.selected = option;
			this.element_selected_callback(option);
		} else if (this.selected !== option) {
			this.element_swapped_callback(option, this.selected);
			this.selected = option;
		}
	}
	get_selected() {
		return this.selected;
	}
	is_selected(option) {
		return this.selected === option;
	}
}

export class MultipleSelectLogic {
	constructor(element_selected_callback, element_unselected_callback) {
		this.selected = [];
		this.element_selected_callback = element_selected_callback;
		this.element_unselected_callback = element_unselected_callback;
	}
	update(option) {
		if (this.selected.includes(option)) {
			this.selected = this.selected.filter(o => o !== option);
			this.element_unselected_callback(option);
		} else {
			this.selected.push(option);
			this.element_selected_callback(option);
		}
	}
	get_selected() {
		return this.selected;
	}
	is_selected(option) {
		return this.selected.includes(option);
	}
}

export class MinMaxSelectLogic {
	constructor(min, max, element_selected_callback, element_unselected_callback, less_than_min_selected_callback, more_than_max_selected_callback) {
		this.min = min;
		this.max = max;
		this.selected = [];
		this.element_selected_callback = element_selected_callback;
		this.element_unselected_callback = element_unselected_callback;
		this.less_than_min_selected_callback = less_than_min_selected_callback;
		this.more_than_max_selected_callback = more_than_max_selected_callback;
	}
	update(option) {
		if (this.selected.includes(option)) {
			if (this.selected.length > this.min) {
				this.selected = this.selected.filter(o => o !== option);
				this.element_unselected_callback(option);
			} else {
				this.less_than_min_selected_callback(option);
			}
		} else {
			if (this.selected.length < this.max) {
				this.selected.push(option);
				this.element_selected_callback(option);
			} else {
				this.more_than_max_selected_callback(option);
			}
		}
	}
	get_selected() {
		return this.selected;
	}
	is_selected(option) {
		return this.selected.includes(option);
	}
	selected_count() {
		return this.selected.length;
	}
	select(option) {
		this.selected.push(option);
	}
	unselect(option) {
		this.selected = this.selected.filter(o => o !== option);
	}
}		


export class ContainerLogic {
	constructor(add_callback, remove_callback) {
		this.elements = [];
		this.add_callback = add_callback;
		this.remove_callback = remove_callback;
	}
	add(element) {
		this.elements.push(element);
		this.add_callback(element);
	}
	remove(element) {
		this.elements = this.elements.filter(e => e !== element);
		this.remove_callback(element);
	}
	get_elements() {
		return this.elements;
	}
}
