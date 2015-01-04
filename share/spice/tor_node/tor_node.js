(function (env) {
    "use strict";

    env.ddg_spice_tor_node = function(api_result) {
        if (!api_result) {
            return Spice.failed("tor_node");
        }

        // Collect together and classify the nodes.
        var i, node, nodes = [];
        for (i = 0; i < api_result.relays.length; i++) {
            node = api_result.relays[i];
            node.ref = node.fingerprint;
            node.type = "Relay";
            nodes.push(node);
        }
        for (i = 0; i < api_result.bridges.length; i++) {
            node = api_result.bridges[i];
            node.ref = node.hashed_fingerprint;
            node.type = "Bridge";
            nodes.push(node);
        }
        if (nodes.length === 0) {
            return Spice.failed("tor_node");
        }

        // Process each node.
        for (i = 0; i < nodes.length; i++) {
            // Bundle together all IPs used by a node.
            node = nodes[i];
            node.addrs = node.or_addresses;
            if (node.exit_addresses) {
                node.addrs.concat(node.exit_addresses);
            }
            if (node.dir_address) {
                node.addrs.push(node.dir_address);
            }
            node.addrs = $.unique($.map(node.addrs, function(addr) {
                return addr.replace(/:[0-9]+$/, "");
            }));

            // Make various fields more friendly.
            if (node.contact) {
                node.contact = node.contact.replace(/mailto:/g, "");
            }
            node.country_icon = DDG.settings.region.getXSmallIconURL(getCountryCode(node.country));
            node.status = node.running ? "Online" : "Offline";
            node.flags = node.flags.join(", ");
            node.first_seen_relative = timeFromNow(node.first_seen);
            node.last_seen_relative = timeFromNow(node.last_seen);
            node.first_seen = prettifyTimestamp(node.first_seen);
            node.last_seen = prettifyTimestamp(node.last_seen);
        }

        // Filter out the trigger from the query.
        var words = DDG.get_query().split(" ");
        var query = (words[0] =~ /tor|onion/i) ? words.pop() : words.shift();

        Spice.add({
            id: "tor_node",
            name: "Tor Node",
            data: nodes,
            meta: {
                sourceName: "Tor Atlas",
                sourceUrl: "https://atlas.torproject.org/#search/" + query
            },
            templates: {
                group: "text",
                detail: Spice.tor_node.detail,
                options: {
                    footer: Spice.tor_node.footer,
                    moreAt: true
                }
            },
            normalize: function(node) {
                if (!node.nickname || node.nickname === "Unnamed") {
                    node.nickname = "Unnamed " + node.type;
                }

                var data = {
                    url: "https://atlas.torproject.org/#details/" + node.ref,
                    title: node.ref,
                    subtitle: node.nickname
                };

                return data;
            }
        });
    };

    function getCountryCode(cc) {
        // I've seen at least one flag from Onionoo not be found due to a
        // mismatch.
        var mapping = {
            gb: "uk"
        };

        return mapping[cc] ? mapping[cc] : cc;
    }

    // Based on function in whois spice.
    function prettifyTimestamp(timestamp) {
        if (!timestamp) {
            return;
        }

        var dateObj = DDG.getDateFromString(timestamp),
            monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day = dateObj.getDate(),
            month = monthArr[dateObj.getMonth() + 1],
            year = dateObj.getFullYear();

        if (day < 10) {
            day = "0" + day
        };

        return month + " " + day + ", " + year;
    }

    // Based on funciton in reddit_search spice.
    function timeFromNow(timestamp) {
       // Scaling factors for various time periods.
       var yearMillisec   = 31540000000;
       var monthMillisec  = 2628000000;
       var dayMillisec    = 86400000;
       var hourMillisec   = 3600000;
       var minuteMillisec = 60000;
       var secondMillisec = 1000;

       // Convert time node was seen to milliseconds.
       var fields = timestamp.split(" ");
       var dateDay = new Date(fields[0]);
       fields = fields[1].split(":");
       var dateSeen = new Date(
           dateDay.getTime() +
           fields[0] * hourMillisec +
           fields[1] * minuteMillisec +
           fields[2] * secondMillisec
       );
       var dateNow = new Date();

       // Get how many milliseconds from now the node was seen.
       var dateSeenMillisec = dateNow.getTime() - dateSeen.getTime();

       // Get how many years, months and days from now the node was seen.
       var yearsFromNow = dateSeenMillisec / yearMillisec;
       var monthsFromNow = dateSeenMillisec / monthMillisec;
       var daysFromNow = dateSeenMillisec / dayMillisec;
       var stringDate = "";

       // If the node was seen more than one year ago, set the returned value to
       // the number of years in between.
       if (yearsFromNow > 1) {
           var years = Math.floor(yearsFromNow);
           stringDate = years + " year";
           if (years > 1) {
               stringDate += "s";
           }
           stringDate += " ago";
       }

       // Otherwise, if the node was seen more than one month ago, set the
       // returned value to the number of months in between
       else if (monthsFromNow > 1) {
           var months = Math.floor(monthsFromNow);
           stringDate = months + " month";
           if (months > 1) {
             stringDate += "s";
           }
           stringDate += " ago";
       }

       // Otherwise, if the node was seen more than one day ago, set the
       // returned value to the number of days in between
       else if (daysFromNow > 1) {
           var days = Math.floor(daysFromNow);
           stringDate = days + " day";
           if (days > 1) {
               stringDate += "s";
           }
           stringDate += " ago";
       }

       // Finally, the node wsa seen today.
       else {
           stringDate = "today";
       }

       return stringDate;
    }
}(this));
