(function(env) {
    "use strict";
    var search_items = DDG.get_query().split(" ");

    var supported_package_managers = {
        alcatraz: "http://alcatraz.io/",
        atom: "https://atom.io/packages",
        bower: "https://bower.io/",
        cran: "https://cran.r-project.org",
        dub: "https://code.dlang.org/download",
        elm: "http://elm-lang.org/",
        emacs: "https://www.gnu.org/software/emacs/",
        go: "https://golang.org/",
        inqlude: "https://inqlude.org/",
        julia: "http://pkg.julialang.org/",
        meteor: "https://www.meteor.com/",
        nimble: "https://nim-lang.org/",
        nuget: "https://www.nuget.org/",
        shards: "https://crystal-shards-registry.herokuapp.com/",
        wordpress: "https://wordpress.org/",
    }

    // if it makes sense and we can build it, we will show the user how to install a package
    var install_scripts = {
        bower: "$ bower install {{package}}",
        cran: "install.packages(\"{{package}}\")",
        elm: "$ elm-package install {{package}}",
        go: "$ go get {{package}}",
        julia: "Pkg.add(\"{{package}}\")",
        meteor: "$ meteor npm install --save {{package}}",
        nimble: "$ nimble install {{package}}",
        nuget: "PM> Install-Package {{package}} -Version {{version}}",
        pub: "dependencies:\n\t\t {{package}}: ^{{version}}",
    }

    // sets up the install script for text view
    // eg. elm-package install elm-lang/html
    function getInstallScript(pkg_manager, pkg_name, pkg_version) {
        var index = pkg_manager.toLowerCase();
        var text = install_scripts[index] || false;

        return text && text.replace('{{package}}', pkg_name).replace('{{version}}', pkg_version);
    }

    // returns the url
    function getUrl(item) {

        var url;
        // sets the home page for the package
        // official website (1st) --> package manager page (2nd) --> GH repo (3rd) --> libraries.io (4th)
        if(item.homepage != null && item.homepage != "") {
            return url = item.homepage;
        } else if(item.package_manager_url != null && item.package_manager_url != "") {
            return url = item.package_manager_url;
        } else if(item.repository_url != null && item.homepage != item.repository_url) {
            return url = item.repository_url;
        } else {
            return url = 'https://libraries.io/api/search?q=' + search_items;
        }
    }

    // gets the domain (host) name
    function getDomainName(url) {
        var hostname;

        if (url.indexOf("://") > -1) {
            hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }

        hostname = hostname.split(':')[0];
        hostname = hostname.split('?')[0];

        return hostname;
    }

    env.ddg_spice_libraries = function(api_result) {
        
        if(!api_result || api_result.length === 0) {
            return Spice.failed('libraries');
        }

        // we'll show the text template if there is an exact match in the
        // query to a highly ranked package
        var text_template =  {
            group: 'text',
            options: {
                content: Spice.libraries.content,
                moreAt: true,
                moreText: { 
                    href: "https://libraries.io",
                    text: "Data by Libraries.io"
                }
            }
        }

        // we'll show the tile template if it's a fuzzy match
        var tile_template =  {
            group: 'text',
            detail: false,
            item_detail: false,
            variants: {
                tile: 'basic1',
                tileTitle: '1line',
                tileFooter: '2line',
                tileSnippet: 'large'
            },
            options: {
                footer: Spice.libraries.footer,
                moreAt: true
            }
        }

        var template, meta;
        var signal = "high";
        var query = DDG.get_query().split(" ");
        query = query[query.length-1];
        var pkgname = api_result[0].name;
        var total = api_result.length;

        meta = {
            search_term: search_items,
            total: total,   
        }

        // determine which template to show and set high/low signal
        if(total === 1) {
            template = text_template;
        } else if(
                (pkgname.toLowerCase() == query) ||
                (api_result[0].platform === "Go" && pkgname.split("/").pop() === query) ||
                (api_result[0].platform === "Elm" && pkgname.split("/")[1] === query)
            ) {
            template = text_template;

            // set the result to the first result
            if (total > 1) {
                api_result = api_result.shift();
            }

            meta.sourceUrl = getUrl(api_result);
            meta.sourceName = getDomainName(meta.sourceUrl);
        } else {
            template = tile_template;
            signal = "low";

            // we'll pass further meta information to the tile template if we're using it
            meta.sourceName = 'libraries.io';
            meta.sourceUrl = 'https://libraries.io/api/search?q=' + search_items;
        }

        Spice.add({
            id: 'libraries',
            name: 'Software',
            signal: signal,
            data: api_result,
            meta: meta,
            templates: template,
            sort_fields: {
                rank: function(a, b) {
                    return a.rank > b.rank ? -1 : 1;
                }
            },
            sort_default: 'rank',
            normalize: function(item) {

                var name, url;
                var package_manager = item.platform;
                var infoboxData = [
                    { heading: 'Package information:' },
                ];

                // show the license if it exists
                if(item.latest_release_number !== undefined 
                    && item.latest_release_number !== "" 
                    && item.latest_release_number !== null) {

                    infoboxData.push({
                        label: "Version",
                        value: item.latest_release_number,
                    });
                }

                // show the license type if it exists
                if(item.normalized_licenses[0] !== undefined) {
                    infoboxData.push({
                        label: "License",
                        value: item.normalized_licenses[0],
                    });
                }

                // show stars if there is any
                if(item.stars > 0) {
                    infoboxData.push({
                        label: "Stars",
                        value: item.stars,
                    });
                }

                // show forks if there is any
                if(item.forks > 0) {
                    infoboxData.push({
                        label: "Forks",
                        value: item.forks,
                    });
                }

                // if a go package, we'll trim the github url from the package name
                if(package_manager === "Go") {
                    name = item.name.replace("github.com/", '');
                } else {
                    name = item.name;
                }

                return {
                    title: name,
                    subtitle: item.platform + " Package",
                    description: item.description,
                    install: getInstallScript(item.platform, item.name, item.latest_release_number),
                    stars: item.stars,
                    forks: item.forks,
                    url: getUrl(item),
                    latest_release: item.latest_release_number,
                    infoboxData: infoboxData.length > 1 ? infoboxData : undefined,
                    librariesIcon: DDG.get_asset_path('libraries',"icons/libraries.png"),
                    moreAtIcon: DDG.get_favicon_url(supported_package_managers[package_manager.toLowerCase()]),
                }
            }
        });
    };
}(this));
