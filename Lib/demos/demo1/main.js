
import * as dom from '../../Dom.js';


class Task {
	constructor(name, description, parent) {
		this.name = name;
		this.description = description;
		this.parent = parent;
	}

	get_elem() {
		let task = dom.elem('task-container');
		task.add_children([
			dom.elem('title').text(this.name),
			dom.elem('description').text(this.description),
		]);
		task.add_child(dom.elem("button").text("Delete").event("click", () => {
			this.parent.remove_child(task);
		}));
		return task.get_elem();
	}
}



dom.on_page_load(() => {

	let tasks_elem = dom.elem("tasks");
	dom.get_body().add_children([
		dom.elem("header").text("Tasks"),
		dom.elem("input").id("task_name"),
		dom.elem("input").id("task_description"),
		dom.elem("button").text("Add Task").event("click", () => {
			let name = dom.get_element_by_id("task_name").get_value();
			let description = dom.get_element_by_id("task_description").get_value();
			let task = new Task(name, description, tasks_elem);
			tasks_elem.add_child(task);
		}),
		tasks_elem,
	]);
});