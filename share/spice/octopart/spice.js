
function ddg_spice_octopart(resp) {
    
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
            
            // Plain English sentence lead in [removed, use header instead]
            //content += "The " + part['mpn'] + " is produced by " + part['manufacturer']['displayname'] + ". ";

            // abstract is octopart-generated short description (up to ~160
            // characters)
            if(part['short_description']) {
                content += " Specs: <i>" + part['short_description'] + "</i>. ";
            }

            // show market price and availability status [andres: edit this]
            if(part['avg_price'].length > 0) {
                if(part['avg_price'][0] < 0.01) {
                    content += "Price below $0.01/each; ";
                } else {
                    content += "Price around $" + part['avg_price'][0].toFixed(2) + "/each; ";
                }
            } else {
                content += "Price unknown; ";
            }
            content += part['market_status'].split(/:\ /)[1] + " ";

            // add top datasheet link if available
            if(part['datasheets'].length > 0) {
                // replace this PDF favicon with a DDG-local one?
                content += "[<a href=\"" + part['datasheets'][0]['url'] + "\"><img src=\"http://n1.octostatic.com/o3/partsearch/partsearch/images/content/pdf_small.jpg\" style=\"display: inline; margin-right: 3px; height: 12px;\"></img>Datasheet</a>] ";
            } else {
                content += "[No Datasheet] ";
            }

            // if we have a direct manufacturer URL use that, or else a link to
            // their homepage, or else nothing
            if(part['hyperlinks']['manufacturer']) {
                content += "[<a href=\"" + part['hyperlinks']['manufacturer'] + "\">Manufacturer</a>] ";
            } else if(part['manufacturer']['homepage_url']) {
                content += "[<a href=\"" + part['manufacturer']['homepage_url'] + "\">Manufacturer</a>] ";
            }

            // attach info
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
