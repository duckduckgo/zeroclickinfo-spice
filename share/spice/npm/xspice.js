// console.log("loading handlebars runtime");
// nrj('/handlebars.runtime.1.0.rc.2.min.js', 1);
// nrj('/handlebars.runtime.js', 1);




var ddg_spice_npm = function(res) {
	if (!res.error) { // If there's an error (such as if the package is not found), this won't be called
	console.log("npm x spice");

// old way ----------------------------

		description = ''; // Initialize content variable
		description += '<pre id="npm_install_command"> $ npm install ' + res.name + '</pre>'; // Easy to read command to install the package
		description += '<div id="npm_package_description">' + res.description + '</div>'; // Add the description

		packages = [[]]; // Create an empty array for all of our informaton
		packages[0]['a'] =  description; // Gives the main description of the plugin
	packages[0].force_big_header = true;
		packages[0]['h'] = res.name + ' (' + res.version + ')'; // Gives the title and version of the package
		packages[0]['s'] = 'npm'; // For attribution (More at npm...)
		packages[0]['u'] = 'http://npmjs.org/package/' + res.name; // Link for attribution
		nra(packages); // Render it all!


// new way ----------------------------

	var obj = {
	    'npm' : res,
	    'abstract'         : description,
	    'force_big_header' : true,
	    'source_name'      : "npmjs.org", // More at ...
	    'source_url'       : 'http://npmjs.org/package/' + res.name
	};


	renderAbstract(obj, 'npm');

    }
}
