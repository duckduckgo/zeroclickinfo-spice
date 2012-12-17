// `ddg_spice_octopart` is a callback function that gets
// called when people search for electronic parts. Example
// triggers are "atmega specs" or "microprocessor datasheet."

// Some example 'datasheet' queries:
//
// - ne555 datasheet
// - atmel avr datasheet
// - datasheet arduino uno
// - UWX1V100MCL1GB datasheet
// - UWX1V100 datasheet
// - blue led datasheet
// - stm32 adc dac ethernet datasheet
// - zigbee transceiver freescale datasheet
//
// Extra info the Octopart API response that could be parsed and displayed
//
// - rohs and lead-free attributes
// - product lifecycle status (obsolete, pre-production, active)
// - categorization (aka, type of component)
// - direct free sample links (for some parts)
//
// Another possibility is to trigger on distributor name and SKU (eg, "newark
// 68T2515") and show part information and a direct link to the distributor's buy
// now page. 


// This anonymous function is used to prevent helper
// functions from becoming global functions. We only expose
// `ddg_spice_octopart` so we attach it to the variable `root`. 
(function(root) {
    "use strict";

    // This function is responsible for calling other functions that
    // process data and display the plugin.
    root.ddg_spice_octopart = function(response) {
        if(response && response.hits > 0) {
            var parts = response.results,
                collection = [],
                snippets = [],
                part;

            // Our goal is to make multiple entries in the plugin.
            for(var i = 0, length = parts.length; i < length; i += 1) {
                snippets = [];
                part = parts[i].item;

                // Skip a product that isn't relevant.
                if(!DDG.isRelevant(part.short_description, {specs: 1, datasheet: 1})) {
                    continue;
                }

                // Filter out stubs.
                if(/^BAD: RFQ Only/.test(part.market_status) && part.images.length === 0) {
                    continue;
                }

                getDescription(part, snippets);
                getPrice(part, snippets);
                getMarketStatus(part, snippets);
                collection.push({
                    heading: getHeading(part),
                    datasheet_url: getDatasheetURL(part),
                    manufacturer_url: getManufacturerURL(part),
                    part: part,
                    snippets: snippets,
                    image: getImage(part)
                });
            }

            display(collection);
        }
    };

    // Returns the URL of the image. If it doesn't exist, it returns an empty string.
    function getImage(part) {
        return part.images.length ? part.images[0].url_55px : "";
    }

    // Links to the manufacturer's website e.g. Atmel.
    function getManufacturerURL(part) {
        return part.hyperlinks.manufacturer ||
                    part.manufacturer.homepage_url;
    }

    // Returns a link to the PDF document.
    function getDatasheetURL(part) {
        if (part.datasheets.length) {
            return part.datasheets[0].url;
        } else {
            return "No Datasheet";
        }
    }

    // Check the availability of this part.
    function getMarketStatus(part, snippets) {
        if (part.num_authsuppliers === 0) {
            snippets.push(part.market_status.replace(/^BAD:/, ''));
        }
    }

    // Format the cost of the part.
    function getPrice(part, snippets) {
        var s = 'Avg Price: ';
        if (part.avg_price && (part.avg_price[0] !== null || part.avg_price[0] !== undefined)) {
            if (part.avg_price < 0.01) {
                s += 'below $0.01/each';
            } else {
                s += '$' + part.avg_price[0].toFixed(2) + '/each';
            }
            snippets.push(s);
        }
    }

    // Gets the description used in the plugin.
    function getDescription(part, snippets) {
        if(part.short_description) {
            snippets.push(specsHTML(html_escape(part.short_description.replace(/[,;]$/, ''))));
        }
    }

    // Returns an array containing the title of the plugin.
    function getHeading(part) {
        return [html_escape(part.manufacturer.displayname), html_escape(part.mpn)];
    }

    function html_escape(s) {
        return s.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g,"&gt;");
    }

    // Adds an emphasis on the text.
    function specsHTML(text) {
        return "Specs: <i>" + text + "</i>";
    }

    // Use this function to create the HTML and call the `nra` function.
    function display(collection) {
        var items = [],
            links = [],
            content = "";

        // `datasheetHTML`, `linkHTML`, and `distributorsHTML` all create links.
        // In the future, it's better to generalize these functions.
        function datasheetHTML(collection, links) {
            if(collection.part.datasheets.length) {
                links.push('<a href="' + collection.datasheet_url + '" ' + 
                        'style="white-space:nowrap;">' +
                        '<img src="' + 'https://icons.duckduckgo.com/i/www.adobe.com.ico' +
                        '" style="' +
                        'display:inline;margin-right:3px;height:12px;"/>' +
                        'Datasheet</a>');
            } else {
                links.push("No Datasheet");
            }
        }

        function linkHTML(collection, links) {
            if(collection.manufacturer_url) {
                links.push('<a href="' + collection.manufacturer_url + '">Manufacturer</a>');
            }
        }

        function distributorsHTML(part, links) {
            if (/^GOOD|WARNING:/.test(part.market_status)) {
                var s = '<a href="' + part.detail_url + '#compare_suppliers' +
                    '" style="white-space:nowrap;">from ';
                if (part.num_authsuppliers === 0) {
                    s += "secondary sources";
                } else {
                    s += part.num_authsuppliers;
                    if (part.num_suppliers > part.num_authsuppliers) {
                        s += "+";
                    }
                    s += " suppliers";
                }
                s += "</a>";
                links.push(s);
            }
        }

        // Loop through each value of collection, append HTML, and then pass it to `nra`.
        for(var i = 0, length = collection.length; i < length; i += 1) {
            links = [];
            datasheetHTML(collection[i], links);
            linkHTML(collection[i], links);
            distributorsHTML(collection[i].part, links);
            content = "";

            if(collection[i].snippets.length) {
                content += collection[i].snippets.join('; ') + ' ';
            }
            if(links.length) {
                content += '[' + links.join('] [') + '] ';
            }
            content += '<div style="clear:both;"></div>';
            items[i] = {
                h: "Octopart - " + collection[i].heading.join(" "),
                a: content,
                i: collection[i].image,
                s: 'Octopart',
                u: collection[i].part.detail_url,
                t: collection[i].heading.join(" "),
                force_big_header: true
            };
        }

        nra(items);
    }
}(this));