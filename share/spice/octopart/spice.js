function ddg_spice_octopart(response) {

        // no results
    if (response.hits > 0) {

        var parts = response.results;

        /**************************
        * Helper methods
        **************************/
        function html_escape(s) {
            return s.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g,"&gt;");
        }

        /**************************
         * Render output
         **************************/
        var out = [];

        for (var i=0; i < parts.length; i++) {

            var part = parts[i].item;

            // filter out stubs
            if (/^BAD: RFQ Only/.test(part.market_status) && part.images.length == 0)
                continue;

            var heading = '';
            var snippets = [];
            var links = [];

            // heading
            heading = html_escape(part.manufacturer.displayname)
                + ' ' + html_escape(part.mpn);

            // snippets (description)
            if (part.short_description) {
                var s = "Specs: <i>"
                    + html_escape(part.short_description.replace(/[,;]$/, ''))
                    + '</i>';
                snippets.push(s);
            }

            // snippets (price)
            if (part.avg_price && part.avg_price[0] != null) {
                var s = 'Avg Price: ';
                if (part.avg_price < 0.01)
                    s += 'below $0.01/each';
                else
                    s += '$' + part.avg_price[0].toFixed(2) + '/each';
                snippets.push(s);
            }

            // snippets (market status)
            if (part.num_authsuppliers == 0)
                snippets.push(part.market_status.replace(/^BAD:/, ''));

            // links (datasheet)
            if (part.datasheets.length) {
                var s = '<a href="' + part.datasheets[0].url + '" '
                    + 'style="white-space:nowrap;">'
                    + '<img src="http://n1.octostatic.com/o3/partsearch/'
                    + 'partsearch/images/content/pdf_small.jpg" style="'
                    + 'display:inline;margin-right:3px;height:12px;"/>'
                    + 'Datasheet</a>';
            } else {
                var s = 'No Datasheet';
            }
            links.push(s);

            // links (manufacturer)
            var murl = part.hyperlinks.manufacturer ||
                part.manufacturer.homepage_url;
            if (murl)
                links.push('<a href="' + murl + '">Manufacturer</a>');

            // links (number of distributors)
            if (/^GOOD|WARNING:/.test(part.market_status)) {
                var s = '<a href="' + part.detail_url + '#compare_suppliers'
                    + '" style="white-space:nowrap;">from ';
                if (part.num_authsuppliers == 0) {
                    s += "secondary sources";
                } else {
                    s += part.num_authsuppliers;
                    if (part.num_suppliers > part.num_authsuppliers)
                        s += "+";
                    s += " suppliers";
                }
                s += "</a>";
                links.push(s);
            }

            // build content
            var content = '';
            if (snippets.length)
                content += snippets.join('; ') + ' ';
            if (links.length)
                content += '[' + links.join('] [') + '] ';

            // set ddg display variables
            out.push({
                h: "Octopart - " + heading,
                a: content,
                i: part.images.length ? part.images[0].url_55px : '',
                s: 'Octopart',
                u: part.detail_url,
                t: heading
            });

        }
        nra(out);
    }
}
