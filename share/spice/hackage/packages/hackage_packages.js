function ddg_spice_hackage_packages(response) {
    var query = DDG.get_query()
                .replace(/(^|\s)(hackage|haskell)($|\s)/, '')
                .replace(/[ ]+/, '');

    var all_packages = {};

    // Check if it already exists.
    if (query in response) {
        $.getJSON("/js/spice/hackage/package_details/" + query, package_details);
    } else {
        
        query = query.toLowerCase();

        // Key gets the lowercase, and the value gets the unmodified string. 
        for (var normal_case in response) {
            if (response.hasOwnProperty(normal_case)) {
                all_packages[normal_case.toLowerCase()] = normal_case;
            }
        }

        // If the query exists in the dictionary, call Haskell::PackageDetails.
        if (all_packages[query]) {
            $.getJSON("/js/spice/hackage/package_details/" + all_packages[query], package_details);
        
        // Now we fumble around. First, check if we find one by just adding an "s" at the end.
        } else if (all_packages[query + "s"]){
            $.getJSON("/js/spice/hackage/package_details/" + all_packages[query + "s"], package_details);
        
        // Second, we check if we find one by removing the last letter. It's a bit silly, but it works.
        } else if (all_packages[query.substring(0, query.length-1)]) {
            $.getJSON("/js/spice/hackage/package_details/" + all_packages[query.substring(0, query.length-1)], package_details);
        }
    }
    
    function package_details(response) {
        if (!response || !response.packageDescription) return;

        var pkg        = {
            name       : response.packageDescription.package.pkgName,
            synopsis   : response.packageDescription.synopsis,
            author     : response.packageDescription.author,
            homepage   : response.packageDescription.homepage,
            license    : response.packageDescription.license,
            library    : response.condLibrary,
            executable : response.condExecutables
        };

        if (pkg.synopsis == "") return;

        Spice.render({
            data             : pkg,
            header1          : pkg.name + " (Hackage)",
            source_url       : 'http://hackage.haskell.org/package/' + pkg.name,
            source_name      : 'Hackage',
            template_normal  : 'hackage_packages',
            force_big_header : true
        });
    }
}
