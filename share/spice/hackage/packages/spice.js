(function(root) {
    "use strict";

    root.hackagePackageVersionsCallback = function(packages) {
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
    };

    root.hackageDataCallback = function(packages) {
        var pkgName = packages.packageDescription.package.pkgName;
        var pkgVersion = packages.packageDescription.package.pkgVersion;
        var synopsis = packages.packageDescription.synopsis;
        var author = packages.packageDescription.author;
        var homepage = packages.packageDescription.homepage;
        var license = packages.packageDescription.license;

        synopsis = synopsis.replace(/\.$/,"");

        var library = packages.condLibrary;
        var executable = packages.condExecutables;

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

        var url = "http://hackage.haskell.org/package/" + pkgName;

        var items = [[]];
        items[0]["a"] = h(synopsis) + "<br/>";
        if (author) {
            items[0].a += "by " + h(author) + "<br/>";
        }
        if (license) {
            items[0].a += h(license) + " &bull; ";
        }
        if (homepage) {
            items[0].a += "<a href=\"" + h(homepage) + "\">Homepage</a> &bull; ";
        }
        items[0].h = "The haskell " + h(type) + " »" + h(pkgName) + "« version " + h(pkgVersion);
        items[0].s = "Hackage";
        items[0].u = url;
            
        nra(items);
    };

    function h(txt) {
        return txt.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}(this));

