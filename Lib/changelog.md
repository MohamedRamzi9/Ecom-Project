# 21-04-2025 :
- added `LocalStorage` class in `Storage.js` file
	- added `set, get_json, get_string, get_number, get_boolean, remove, clear` methods
- removed `set_local_storage, get_local_storage, remove_local_storage` functions from `Storage.js` file


# 19-04-2025 :
- added `get_children_count` method to `element` class
- added `username_error, password_error, clear_error` methods to `login_component` class

# 18-04-2025 :
- added `get_child_by_index, placeholder` method to `element` class
- added `get_head, style` function
- created `Component.js` file
	- added `login_component` class
	- added it to the list of files in readme.md
- added `todo.md` file


# 17-04-2025 :
- updated demo1 
- renamed `make_element` to `elem` 

# 16-04-2025 :
- added `parent, get_parent, remove_parent, swap_parent, is_null` methods to `element` class

# 15-04-2025 :
- renamed `_to_element` to `to_element` and made it a public method
- added `html, name, get_name` method to `element` class
- renamed `append_children` to `add_children`, `append_child` to `add_child` methods in `element` class
- added `readme.md` file


# 31-03-2025 :
- added `clear_classes, remove_class, remove_child_by_index, replace_child` methods to `element` class

# 09-03-2025 :
- added `get_elements_by_class, get_elements_by_tag, get_elements_by_query, get_elements_by_name, _to_element, make_element` functions
- added `get_elements_by_class, get_elements_by_tag, get_elements_by_query, get_elements_by_name, _to_element` methods to `element` class

# 08-03-2025 :
- added `get_element_by_query` function
- added `get_element_by_query` method to `element` class

# 07-03-2025 :
- created the project
- created `element` class 
	- added `elem, get_elem, id, get_id, text, get_text, value, get_value, clear, event, append_child, pop_child, append_children` methods
- added `get_element_by_id` function
- added `Storage.js` file
	- added `local_storage_get, local_storage_set, local_storage_remove` functions
- added `add_class`, `add_classes` to `element` class