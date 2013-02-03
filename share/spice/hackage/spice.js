function hackageDataCallback(re) {    
    var pkgName = re['packageDescription']['package']['pkgName'];
    var pkgVersion = re['packageDescription']['package']['pkgVersion'];
    var synopsis = re['packageDescription']['synopsis'];
    //var description = re['packageDescription']['description'];
    var author = re['packageDescription']['author'];
    var homepage = re['packageDescription']['homepage'];
    var license = re['packageDescription']['license'];

    synopsis = synopsis.replace(/\.$/,"");

    var library = re['condLibrary'];
    var executable = re['condExecutables'];

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

    items = new Array();
    items[0] = new Array();
    items[0]["a"] = h(synopsis) + "<br/>";
    if (author) {
    	items[0]["a"] += "by " + h(author) + "<br/>";
    }
    if (license) {
    	items[0]["a"] += h(license) + " &bull; ";
    }
    if (homepage) {
    	items[0]["a"] += "<a href=\"" + h(homepage) + "\">Homepage</a> &bull; ";
    }
    items[0]["h"] = "The haskell " + h(type) + " »" + h(pkgName) + "« version " + h(pkgVersion);
    items[0]["s"] = "Hackage";
    items[0]["u"] = url;
        
    nra(items);
};

function h(txt) {
        return txt.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

