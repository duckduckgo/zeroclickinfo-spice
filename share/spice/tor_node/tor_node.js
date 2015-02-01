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
            node.ref_name = "Fingerprint";
            node.ref = node.fingerprint;
            node.type = "Relay";
            nodes.push(node);
        }
        for (i = 0; i < api_result.bridges.length; i++) {
            node = api_result.bridges[i];
            node.ref_name = "Hashed Fingerprint";
            node.ref = node.hashed_fingerprint;
            node.type = "Bridge";
            nodes.push(node);
        }
        if (nodes.length === 0) {
            return Spice.failed("tor_node");
        }

        // Format the node's properties to be more friendly.
        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];

            node.url = "https://atlas.torproject.org/#details/" + node.ref;

            // Ensure the node has a title.
            if (node.nickname && node.nickname !== "Unnamed") {
                node.title = node.nickname;
            }
            else {
                node.title = "(Unnamed)";
            }
        }
 
        // Filter out the trigger from the query.
        var words = DDG.get_query().split(" ");
        var query = (words[0] =~ /tor|onion/i) ? words.pop() : words.shift();

        // We use different templates depending on the number of nodes.
        if (nodes.length === 1) {
            return singleNode(query, nodes[0]);
        }
        return multipleNodes(query, nodes);
    };

    function singleNode (query, node) {
        Spice.add({
            id: "tor_node",
            name: "Answer",
            data: node,
            meta: {
                itemType: "Tor " + node.type,
                sourceName: "Tor Atlas",
                sourceUrl: "https://atlas.torproject.org/#details/" + node.ref
            },
            templates: {
                group: "text",
                detail: Spice.tor_node.detail,
                options: {
                    footer: Spice.tor_node.footer,
                    rowHighlight: true,
                    moreAt: true
                }
            },
            normalize: function(node) {
                // Format contact info.
                if (node.contact) {
                    node.contact = node.contact.replace(/mailto:/g, "");
                }

                // Bundle together all IPs used by a node.
                node.addrs = node.or_addresses;
                if (node.exit_addresses) {
                    node.addrs.concat(node.exit_addresses);
                }
                if (node.dir_address) {
                    node.addrs.push(node.dir_address);
                }
                node.addrs = $.unique($.map(node.addrs, stripPort));

                // Handle the node's locale.
                node.icon = DDG.settings.region.getXSmallIconURL(getCountryCode(node.country));

                // Handle the node's uptime history.
                node.first_seen = prettifyTimestamp(node.first_seen);
                node.last_seen = prettifyTimestamp(node.last_seen);

                return node;
            }
        });
    }

    function multipleNodes (query, nodes) {
        Spice.add({
            id: "tor_node",
            name: "Answer",
            data: nodes,
            meta: {
                itemType: "Tor Nodes",
                sourceName: "Tor Atlas",
                sourceUrl: "https://atlas.torproject.org/#search/" + query
            },
            templates: {
                group: "icon",
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.tor_node.footer,
                    moreAt: true
                }
            },
            normalize: function(node) {
                var data = {};

                data.title = node.title;
                data.url = node.url;

                data.description = "";
                if (node.or_addresses !== 1) {
                    data.description = stripPort(node.or_addresses[0]) + "\n";
                }
                data.description += node.ref;

                // Handle the node's locale.
                data.icon = DDG.settings.region.getSmallIconURL(getCountryCode(node.country));

                // Handle the node's uptime history.
                data.online = node.running;
                if (data.online) {
                    data.uptime = timeFromNow(node.last_restarted);
                }
                else {
                    data.downtime = timeFromNow(node.last_seen);
                }

                // Make the bandwidth friendly.
                if (node.advertised_bandwidth) {
                    data.bandwidth = prettifyBitrate(node.advertised_bandwidth);
                }

                return data;
            }
        });
    }

    function stripPort(addr) {
        return addr.replace(/:[0-9]+$/, "");
    }

    function getCountryCode(cc) {
        // I've seen at least one flag from Onionoo not be found due to a
        // mismatch.
        var mapping = {
            gb: "uk"
        };

        return mapping[cc] ? mapping[cc] : cc;
    }

    function prettifyBitrate(bitrate) {
        var rateTiBps = 1099511627776;
        var rateGiBps = 1073741824;
        var rateMiBps = 1048576;
        var rateKiBps = 1020;

        var magnitude, letter;
        if (bitrate >= rateTiBps) {
            magnitude = rateTiBps;
            letter = "T";
        }
        else if (bitrate >= rateGiBps) {
            magnitude = rateGiBps;
            letter = "G";
        }
        else if (bitrate >= rateMiBps) {
            magnitude = rateMiBps;
            letter = "M";
        }
        else if (bitrate >= rateKiBps) {
            magnitude = rateKiBps;
            letter = "K";
        }
        else {
            magnitude = 1;
            letter = "";
        }

        return (bitrate / magnitude).toFixed(2) + " " + letter + "iB/s";
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

    // Based on function in reddit_search spice.
    function timeFromNow(timestamp) {
       // Scaling factors for various time periods.
       var scales = [
           ["y", 31540000000],
           ["w", 604800000],
           ["d", 86400000],
           ["h", 3600000],
           ["m", 60000]
       ];

       // Convert time node was seen to milliseconds.
       var fields = timestamp.split(" ");
       var dateDay = new Date(fields[0]);
       fields = fields[1].split(":");
       var dateSeen = new Date(
           dateDay.getTime() +
           fields[0] * scales[3][1] +
           fields[1] * scales[4][1] +
           fields[2] * 1000
       );
       var dateNow = new Date();
       var durationMS = dateNow.getTime() - dateSeen.getTime();
       var duration = new Array();

       for (var i = 0; i < scales.length; i++) {
           var suffix = scales[i][0];
           var millis = scales[i][1];

           if (durationMS < millis) {
               continue;
           }

           var used = Math.floor(durationMS / millis);
           duration.push(used + suffix);
           durationMS -= used * millis;
       }

       if (duration.length === 0) {
           return "now";
       }

       return duration.join(" ");
    }
}(this));
