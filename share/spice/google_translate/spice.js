function ddg_spice_google_translate(json) {
	if(json.length) {
		items = [[]];
		items[0]["a"] = json[0][0][0];
		items[0]["h"] = "Translation of "+json[0][0][1];
		items[0]["s"] = "Google Translate";
		items[0]["u"] = "http://translate.google.com/#auto%7Cen%7C"+encodeURIComponent(json[0][0][1]);
		nra(items);
	}
};
