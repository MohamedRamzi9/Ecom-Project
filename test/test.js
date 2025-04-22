import * as dom from '../Dom.js';
import { LocalStorage } from "../Storage.js";
import * as url from '../URL.js';


dom.on_page_load(() => {

	const filters = {
		category: ['fiction', 'history'],
		sort: 'asc',
		rating: { min: 4, max: 5 }
	};
	  
	let string = url.to_string({value: "12312", a: 5});
	let json = url.to_json(string);
	console.log(json); 

});