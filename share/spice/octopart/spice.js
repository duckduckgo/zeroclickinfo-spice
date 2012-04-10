function nroctopart(resp) {
    
    //console.log(resp);
    var heading = "";
    var content = "";
    var items = new Array();
    
    // validity check
    if(resp['results'].length > 0) {
        // may have multiple results; limit parameter set in nginx.conf
        for(var i=0; i<resp['results'].length; i++) {
            var part = resp['results'][i]['item'] 
            items[i] = new Array();
            heading = ""
            content = ""

            // header is manufacturer name followed by MPN
            heading = "<b>" + part['manufacturer']['displayname'] + ' ' + part['mpn'] + "</b>";

            // abstract is octopart-generated short description (up to ~160 characters)
            if(part['short_description']) {
                content += part['short_description'] + '<br><br>';
            }

            // add top datasheet link if available
            if(part['datasheets'].length > 0) {
                // replace this PDF favicon with a DDG-local one?
                content += "<a href=\"" + part['datasheets'][0]['url'] + "\"><img src=\"http://n1.octostatic.com/o3/partsearch/partsearch/images/content/pdf_small.jpg\" style=\"float: left; margin-right: 3px;\"></img> Datasheet</a> | ";
            } else {
                content += "No Datasheet | "
            }

            // show market price and availability status
            if(part['avg_price'].length > 0) {
                content += "Market Price $" + part['avg_price'][0].toFixed(2) + " | ";
            } else {
                content += "Market unknown | ";
            }
            content += part['market_status'].split(/:\ /)[1]

            // if we have a direct manufacturer URL use that, or else a link to
            // their homepage, or else nothing
            if(part['hyperlinks']['manufacturer']) {
                content += "<br>More info from <a href=\"" + part['hyperlinks']['manufacturer'] + "\">" + part['manufacturer']['displayname'] + "</a>";
            } else if(part['manufacturer']['homepage_url']) {
                content += "<br><a href=\"" + part['manufacturer']['homepage_url'] + "\">" + part['manufacturer']['displayname'] + " Homepage</a>";
            }

            items[i]['h'] = heading;
            items[i]['a'] = content;

            // use the 55px thumbail PNG image if we have one
            if(part['images'].length > 0) {
                items[i]['i'] = part['images'][0]['url_55px'];
            } else {
                items[i]['i'] = '';
            }

            // Source name and url for the More at X link.
            items[i]['s'] = "Octopart";
            items[i]['u'] = part['detail_url'];
        }
        nra(items);
    } else {
        //console.log("No Octopart response...");
    }
}
