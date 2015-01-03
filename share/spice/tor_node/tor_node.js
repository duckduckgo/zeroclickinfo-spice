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
            node.type = "Relay";
            nodes.push(node);
        }
        for (i = 0; i < api_result.bridges.length; i++) {
            node = api_result.bridges[i];
            node.type = "Bridge";
            nodes.push(node);
        }

        // We use different templates for different situations.
        if (nodes.length === 0) {
            return Spice.failed("tor_node");
        }
        if (nodes.length === 1) {
            single_result(nodes[0]);
        }
        else {
            multiple_results(nodes);
        }
    };

    function single_result(node) {
        var fp, data = {};

        if (node.type === "Relay") {
            fp = node.fingerprint;
            data["Fingerprint"] = fp;
        }
        else {
            fp = node.hashed_fingerprint;
            data["Hashed Fingerprint"] = fp;
        }

        data["Type"] = node.type;

        if (node.nickname && node.nickname !== "Unnamed")
            data["Nickname"] = node.nickname;

        if (node.contact)
            data["Contact"] = node.contact;

        var addrs = node.or_addresses.join(", ").replace(/:[0-9]+/g, "");
        if (node.or_addresses.length === 1)
            data["IP"] = addrs;
        else
            data["IPs"] = addrs;

        if (node.country_name)
            data["Country"] = node.country_name;

        data["Status"] = node.running ? "Online" : "Offline";
        data["First Seen"] = node.first_seen;
        data["Last Seen"] = node.last_seen;
	data["Flags"] = node.flags.join(", ");

        Spice.add({
            id: "tor_node",
            name: "Tor Node",
            data: {
		record_data: data
            },
            meta: {
                sourceName: "Tor Atlas",
                sourceUrl: "https://atlas.torproject.org/#details/" + fp
            },
            templates: {
                group: "base",
                options: {
                    content: "record",
                    moreAt: true,
                    rowHighlight: true
                }
            }
        });
    }

    function multiple_results(nodes) {
        // Unimplemented.
        return Spice.failed("tor_node");
    }
}(this));
