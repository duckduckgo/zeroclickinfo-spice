(function (env) {
    "use strict";

    env.ddg_spice_tor_node = function(api_result) {
        if (!api_result) {
            return Spice.failed("tor_node");
        }

        var node, type, data = {};
        if (api_result.relays.length != 0) {
            node = api_result.relays[0];
            data["Type"] = "Relay";
            data["Fingerprint"] = node.fingerprint;
        }
        else if (api_result.bridges.length != 0) {
            node = api_result.bridges[0];
            data["Type"] = "Bridge";
            data["Hashed Fingerprint"] = node.hashed_fingerprint;
        }
        else {
            return Spice.failed("tor_node");
        }

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
                sourceUrl: "https://atlas.torproject.org/#details/" + node.fingerprint
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
    };
}(this));
