function hackageDataCallback(hackage) {
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

