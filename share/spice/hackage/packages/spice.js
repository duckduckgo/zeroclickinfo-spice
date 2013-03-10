function ddg_spice_hackage_packages(packages) {
    "use strict";

    // Remove the trigger word.
    var query = DDG.get_query().replace(/(^|\s)(hackage|haskell)($|\s)/, '');
    // Convert multiple spaces into a single one.
    query = query.replace(/[ ]+/, ' ');
    // Remove trailing / leading spaces.
    query = query.replace(/^\s+|\s+$/, '');
    // Convert to lowercase.
    query = query.toLowerCase();

    var hasOwn = ({}).hasOwnProperty;
    var all_packages = {};
    
    // Key gets the lowercase, and the value gets the unmodified string. 
    for(var normal_case in packages) {
        if(hasOwn.call(packages, normal_case)) {
            all_packages[normal_case.toLowerCase()] = normal_case;
        }
    }

    // If the query exists in the dictionary, call Haskell::PackageDetails.
    if(all_packages[query.toLowerCase()]) {
        nrj("/js/spice/hackage/package_details/" + all_packages[query.toLowerCase()]);
    }
}

function ddg_spice_hackage_package_details(hackage) {
    "use strict";

    var pkgName = hackage.packageDescription.package.pkgName,
        synopsis = hackage.packageDescription.synopsis,
        author = hackage.packageDescription.author,
        homepage = hackage.packageDescription.homepage,
        license = hackage.packageDescription.license,
        library = hackage.condLibrary,
        executable = hackage.condExecutables;

        var type;
        if (library && (executable.length > 0)) {
            type = "library and program";
        } else if (executable.length > 0) {
            type = "program";
        } else if (library) {
            type = "library";
        } else {
            type = "something";
        }    

        var items = [[]];
        var url = "http://hackage.haskell.org/package/" + pkgName;

        items[0] = {
            h: "Hackage (" + pkgName + ")",
            s: "Hackage",
            u: url,
            force_big_header: true
        };

        if(synopsis.match(/\.$/)) {
            synopsis += "<br>";
        } else {
            synopsis += ".<br>";
        }
        items[0].a = synopsis;
        if (author) {
            items[0].a += "Author: " + author;
        }
        if(homepage) {
            items[0].a += " (<a href='" + homepage + "'>Homepage</a>)" + "<br>";
        }
        if (license) {
            items[0].a += "License: " + license + " ";
        }
        nra(items, 1, 1);
}

