import * as dom from '../Dom.js';
import { LocalStorage } from "../Storage.js";

dom.on_page_load(() => {


	LocalStorage.set('test_number', 123);
	console.log(LocalStorage.get_number('test_number')); // 123

	LocalStorage.set('test_string', 'hello');
	console.log(LocalStorage.get_string('test_string')); // hello

	LocalStorage.set('test_json', { a: 1, b: 2 });
	console.log(LocalStorage.get_json('test_json')); // { a: 1, b: 2 }

	LocalStorage.set('test_boolean', false);
	console.log(LocalStorage.get_boolean('test_boolean')); // true


});