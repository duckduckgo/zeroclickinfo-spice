function ddg_spice_hackage_packages(response) {
    "use strict";

    var query = DDG.get_query()
                .replace(/(^|\s)(hackage|haskell)($|\s)/, '')
                .replace(/[ ]+/, '');

    var hasOwn = ({}).hasOwnProperty;
    var all_packages = {};

    // Check if it already exists.
    if(query in response) {
        nrj("/js/spice/hackage/package_details/" + query);
    } else {
        // Convert to lowercase.
        query = query.toLowerCase();

        // Key gets the lowercase, and the value gets the unmodified string. 
        for(var normal_case in response) {
            if(hasOwn.call(response, normal_case)) {
                all_packages[normal_case.toLowerCase()] = normal_case;
            }
        }

        // If the query exists in the dictionary, call Haskell::PackageDetails.
        if(all_packages[query]) {
            nrj("/js/spice/hackage/package_details/" + all_packages[query]);
        // Now we fumble around. First, check if we find one by just adding an "s" at the end.
        } else if(all_packages[query + "s"]){
            nrj("/js/spice/hackage/package_details/" + all_packages[query + "s"]);
        // Second, we check if we find one by removing the last letter. It's a bit silly, but it works.
        } else if(all_packages[query.substring(0, query.length-1)]) {
            nrj("/js/spice/hackage/package_details/" + all_packages[query.substring(0, query.length-1)]);
        }
    }
}

function ddg_spice_hackage_package_details(response) {
    "use strict";

    if (!response || !response.packageDescription) {
      return;
    }

    var pkg        = {};
    pkg.name       = response.packageDescription.package.pkgName,
    pkg.synopsis   = response.packageDescription.synopsis,
    pkg.author     = response.packageDescription.author,
    pkg.homepage   = response.packageDescription.homepage,
    pkg.license    = response.packageDescription.license,
    pkg.library    = response.condLibrary,
    pkg.executable = response.condExecutables;

    if (pkg.synopsis == "") {
      return;
    }

    Spice.render({
        data             : pkg,
        header1          : pkg.name + " (Hackage)",
        source_url       : 'http://hackage.haskell.org/package/' + pkg.name,
        source_name      : 'Hackage',
        template_normal  : 'hackage_packages',
        force_big_header : true
    });
}
