(function (env) {
    "use strict";

    env.ddg_spice_tor_node = function(api_result) {
        if (!api_result) {
            return Spice.failed("tor_node");
        }

        // Filter out the trigger from the query.
        var words = DDG.get_query().split(" "),
            reg   = /tor|onion/i,
            query = (reg.test(words[0])) ? words.pop() : words.shift();

        // Collect together and classify the nodes.
        var i, node, nodes = [];
        for (i = 0; i < api_result.relays.length; i++) {
            node = api_result.relays[i];
            node.ref_name = "Fingerprint";
            node.ref      = node.fingerprint;
            node.type     = "Relay";
            nodes.push(node);
        }
        for (i = 0; i < api_result.bridges.length; i++) {
            node = api_result.bridges[i];
            node.ref_name = "Hashed Fingerprint";
            node.ref      = node.hashed_fingerprint;
            node.type     = "Bridge";
            nodes.push(node);
        }

        if (nodes.length === 0) {
            return Spice.failed("tor_node");
        }

        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];

            if (node.nickname && node.nickname !== "Unnamed") {
                node.title = node.nickname;
            } else {
                node.title = "Unnamed " + node.type;
            }

            if (node.advertised_bandwidth) {
                node.bandwidth = prettifyBitrate(node.advertised_bandwidth);
            }

            node.url = "https://metrics.torproject.org/rs.html#details/" + node.ref;
        }

        var spice = {
            id: "tor_node",
            name: "Tor Node",
            nodes: nodes,
            meta: {
                sourceName: "Tor Metrics Relay Search",
                sourceUrl: "https://metrics.torproject.org/rs.html#search/" + query,
                itemType: "Nodes"
            },
            templates: {
                options:{
                    moreAt: true
                }
            },
            sort_fields: {
                'uptime' : function (a,b) {
                    return moment(a.last_restarted).isBefore(b.last_restarted) ? -1 : 1;
                }
            },
            sort_default: 'uptime'
        };

        DDG.require('moment.js', function(){

            // Configure moment.js
            // "1 minute" instead of "a minute", etc.
            moment.locale('en', {
                relativeTime : {
                    future: "in %s",
                    past: "%s ago",
                    s:  "seconds",
                    m:  "1 minute",
                    mm: "%d minutes",
                    h:  "1 hour",
                    hh: "%d hours",
                    d:  "1 day",
                    dd: "%d days",
                    M:  "1 month",
                    MM: "%d months",
                    y:  "1 year",
                    yy: "%d years"
                }
            });

            // Template choice depends on the number of nodes
            if (nodes.length === 1) {
                singleNode(spice);
            } else {
                multipleNodes(spice);
            }

            Spice.add(spice);
        });
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
            return {
                title: item.record_data.title
            };
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
        var ip_key = node.addrs.length > 1 ? "IPs" : "IP";
        addField(ip_key, node.addrs.join(", "));

        // Handle the node's uptime history.
        addField("First Seen", moment(node.first_seen).format('MMM DD, YYYY'));
        addField("Last Seen", moment(node.last_seen).format('MMM DD, YYYY'));

        // Handle the node's bandwidth.
        if (node.bandwidth) {
            addField("Bandwidth", node.bandwidth);
        }

        // Handle the node's bandwidth.
        if (node.flags && node.flags.length !== 0) {
            addField("Flags", node.flags.join(", "));
        }

        // Configure the template.
        base.templates = {
            group: "list",
            options: {
                content: "record"
            }
        };

        base.meta.sourceUrl = node.url;

        return base;
    }

    function multipleNodes(base) {
        base.data = base.nodes;
        base.templates = {
            group: "icon",
            detail: false,
            item_detail: false,
            options: {
                footer: Spice.tor_node.footer
            },
            variants: {
                tileTitle: '1line-large',
                tileSnippet: 'small'
            },
            elClass: {
                tileSubtitle: 'tx-clr--grey tx--14',
                tileSnippet: 'tx-clr--slate-light tx--14',
                tileFoot: 'tx--14'
            }
        };

        base.normalize = function(node) {
            // Handle the node's locale.
            node.icon = DDG.settings.region.getSmallIconURL(getCountryCode(node.country));

            // Handle the node's uptime history.
            node.uptime = moment(node.last_restarted).fromNow(true);
            node.downtime = moment(node.last_seen).fromNow(true);

            // Construct the tile body text.
            node.description = "";
            if (node.or_addresses.length !== 0) {
                node.subtitle = stripPort(node.or_addresses[0]);
            }
            node.description += node.ref;

            return node;
        };

        return base;
    }

    function stripPort(addr) {
        return addr.replace(/:\[0-9]+$/, "").replace(/^\[|\]$/g, "");
    }

    function getCountryCode(cc) {
        // I've seen at least one flag from Onionoo
        // not be found due to a mismatch.
        var mapping = {
            gb: "uk"
        };

        return mapping[cc] ? mapping[cc] : cc;
    }

    function prettifyBitrate(bitrate) {
        var rateTiBps = 1099511627776,
            rateGiBps = 1073741824,
            rateMiBps = 1048576,
            rateKiBps = 1020;

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
}(this));
