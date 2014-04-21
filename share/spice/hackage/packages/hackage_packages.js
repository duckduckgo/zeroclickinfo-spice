(function(env) {
    "use strict";

    // Prevent jQuery from appending "_={timestamp}" in our url when we use $.getScript.
    // If cache was set to false, it would be calling /js/spice/hackage/packages/hello?_=12345
    // and that's something that we don't want.
    $.ajaxSetup({ cache: true });

    env.ddg_spice_hackage_packages = function(api_result) {
	var script = $('[src*="/js/spice/hackage/packages/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/hackage\/packages\/([^\/]*)/)[1];

	// Check if it already exists.
	if(query in api_result) {
	    $.getScript("/js/spice/hackage/package_details/" + query);
	} else {
	    var hasOwn = ({}).hasOwnProperty;
	    var all_packages = {};

	    // Convert to lowercase.
	    query = query.toLowerCase();
	    
	    // Key gets the lowercase, and the value gets the unmodified string.
	    for(var normal_case in api_result) {
		if(hasOwn.call(api_result, normal_case)) {
		    all_packages[normal_case.toLowerCase()] = normal_case;
		}
	    }

	    if(all_packages[query]) {
		// If the query exists in the dictionary, call Haskell::PackageDetails.
		$.getScript("/js/spice/hackage/package_details/" + all_pakages[query]);
	    } else if(all_packages[query + "s"]) {
		// Now we fumble around. First, check if we find one by just adding an "s" at the end.
		$.getScript("/js/spice/hackage/package_details/" + all_packages[query + "s"]);
	    } else if(all_packages[query.substring(0, query.length-1)]) {
		// Second, we check if we find one by removing the last letter. 
		// It's a bit silly, but it works.
		$.getScript("/js/spice/hackage/package_details/" + all_packages[query.substring(0, query.length-1)]);
	    }
	}
    };

    env.ddg_spice_hackage_package_details = function(api_result) {

	if(!api_result || !api_result.packageDescription) {
	    return;
	}
	
	var name = api_result.packageDescription.package.pkgName;
	Spice.add({
	    id: 'hackage',
	    name: 'Haskell Packages',
	    data: api_result,
	    meta: {
		sourceName: 'Hackage',
		sourceUrl: 'http://hackage.haskell.org/package/' + name,
		sourceIcon: true
	    },
	    normalize: function(o) {
		return {
		    name: name,
		    synopsis: o.packageDescription.synopsis,
		    description: o.packageDescription.description,
		    author: o.packageDescription.author,
		    homepage: o.packageDescription.author,
		    license: o.packageDescription.license,
		    library: o.condLibrary,
		    executable: o.condExecutables
		};
	    },
	    templates: {
		detail: Spice.hackage_packages.item
	    }
	});
    };
}(this));


// function ddg_spice_hackage_package_details(response) {
//     "use strict";

//     if (!response || !response.packageDescription) {
//       return;
//     }

//     var pkg        = {};
//     pkg.name       = response.packageDescription.package.pkgName,
//     pkg.synopsis   = response.packageDescription.synopsis,
//     pkg.author     = response.packageDescription.author,
//     pkg.homepage   = response.packageDescription.homepage,
//     pkg.license    = response.packageDescription.license,
//     pkg.library    = response.condLibrary,
//     pkg.executable = response.condExecutables;

//     if (pkg.synopsis == "") {
//       return;
//     }

//     Spice.add({
//         data             : pkg,
//         header1          : pkg.name + " (Hackage)",
//         sourceUrl       : 'http://hackage.haskell.org/package/' + pkg.name,
//         sourceName      : 'Hackage',
//         templates: {
//             item: Spice.hackage_packages.hackage_packages,
//             detail: Spice.hackage_packages.hackage_packages
//         },
        
//     });
// }
