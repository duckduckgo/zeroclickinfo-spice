(function (env) {
    "use strict";

    env.ddg_spice_tor_node = function(api_result) {
        if (!api_result) {
            return Spice.failed("tor_node");
        }

        // Put together the base of the Spice.
        var base = get_shared_spice_data(api_result);
        if (base === null) {
            return Spice.failed("tor_node");
        }

        // We use different templates depending on the number of nodes.
        var spice;
        if (base.nodes.length === 1) {
           spice = singleNode(base);
        }
        else {
           spice = multipleNodes(base);
        }

        if (spice === null) {
            return Spice.failed("tor_node");
        }

        Spice.add(spice);
    };

    function singleNode(base) {
        function addField(name, value) {
            base.data.record_data[name] = value;
            base.data.record_keys.push(name);
        }

        // Create a shortcut for the node.
        var node = base.nodes[0];

        // Prepare the object that will define this template.
	base.data = {
	    "record_data": {"title": node.title},
	    "record_keys": []
	};
        addField(node.ref_name, node.ref);

        base.normalize = function(item) {
            return {title: item.record_data.title};
        };

        // Format contact info.
        if (node.contact) {
            addField("Contact", node.contact.replace(/mailto:/g, ""));
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
        addField("IPs", node.addrs.join(", "));

        // Handle the node's uptime history.
        addField("First Seen", prettifyTimestamp(node.first_seen));
        addField("Last Seen", prettifyTimestamp(node.last_seen));

        // Handle the node's bandwidth.
        if (node.bandwidth) {
            addField("Advertised Bandwidth", node.bandwidth);
        }

        // Handle the node's bandwidth.
        if (node.flags && node.flags.length !== 0) {
            addField("Flags", node.flags.join(", "));
        }

        // Configure the template.
        base.templates.group = "text";
	base.templates.options.content = "record";
	base.templates.options.keySpacing = true;
        base.meta.sourceUrl = node.url;

        return base;
    }

    function multipleNodes(base) {
        base.data = base.nodes;
        base.templates.group = "icon";
        base.templates.detail = false;
        base.templates.item_detail = false;
        base.templates.options.footer = Spice.tor_node.footer;

        base.normalize = function(node) {
            // Handle the node's locale.
            node.icon = DDG.settings.region.getSmallIconURL(getCountryCode(node.country));

            // Handle the node's uptime history.
            node.uptime = timeFromNow(node.last_restarted);
            node.downtime = timeFromNow(node.last_seen);

            // Construct the tile body text.
            node.description = "";
            if (node.or_addresses.length !== 0) {
                node.description = stripPort(node.or_addresses[0]) + "\n";
            }
            node.description += node.ref;

            return node;
        };

        return base;
    }

    // Data that's shared between the two Spice.add calls.
    function get_shared_spice_data(api_result) {
        // Filter out the trigger from the query.
        var words = DDG.get_query().split(" ");
        var query = (words[0] =~ /tor|onion/i) ? words.pop() : words.shift();

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
            return null;
        }

        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];

            if (node.nickname && node.nickname !== "Unnamed") {
                node.title = node.nickname;
            }
            else {
                node.title = "Unnamed " + node.type;
            }

            if (node.advertised_bandwidth) {
                node.bandwidth = prettifyBitrate(node.advertised_bandwidth);
            }

            node.url = "https://atlas.torproject.org/#details/" + node.ref;
        }

        return {
            id: "tor_node",
            name: "Tor Node",
            nodes: nodes,
            meta: {
                sourceName: "Tor Atlas",
                sourceUrl: "https://atlas.torproject.org/#search/" + query
            },
            templates: {
                options:{
                    moreAt: true
                }
            }
        };
    };

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
