
# 05-05-2025 :
- added `ws` attribute and `send` method to `WebSocket` class and changed `connect` method to return `this` instead of `ws`

# 04-05-2025 :
- added `src, get_src, background_image, get_background_image` method to `element` class

# 03-05-2025 :
- added `path, url, goto_path, goto_url, push_state, set_state, get_state, format_path, on_pop_state` functions to `URL` class

# 01-05-2025 :
- added `insert_child_at, insert_child_before, insert_child_after, selected, get_selected, first_child, get_first_child, last_child, get_last_child, checked, get_checked` methods to `element` class
- added `label` function to `Dom.js` file
- added `select, option` function to `Dom.js` file
- added `Utils.js` file
	- added `int, float, str, bool` functions

# 30-04-2025 :
- added `type, get_type, attr, get_attr` method to `element` class
- rename `get_child_by_index` to `get_child_at`, `remove_child_by_index` to `remove_child_at` methods in `element` class
- added negative index support to `get_child_at` method in `element` class
- added _ to all attribute members of `WebSocket` class

# 22-04-2025 :
- added `URL.js` file
	- added `to_string, to_json` functions

# 21-04-2025 :
- added `LocalStorage` class in `Storage.js` file
	- added `set, get_json, get_string, get_number, get_boolean, remove, clear` methods
- removed `set_local_storage, get_local_storage, remove_local_storage` functions from `Storage.js` file
- removed `websocket` function from `WebSocket.js` file

# 19-04-2025 :
- added `get_children_count` method to `element` class
- added `username_error, password_error, clear_error` methods to `login_component` class
- added `WebSocket` class in `WebSocket.js` file
	- added `connect, uri, on_message, on_open, on_close` methods

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