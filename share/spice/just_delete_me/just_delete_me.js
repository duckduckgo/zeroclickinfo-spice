(function (env) {
    "use strict";
    env.ddg_spice_just_delete_me = function(api_result) {
        if (!api_result || api_result.length < 1) {
            return Spice.failed('just_delete_me');
        }
        var script = $('[src*="/js/spice/just_delete_me/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/just_delete_me\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query).split(" ")[0].toLowerCase();

        if (!decodedQuery || decodedQuery.length < 4) {
            return Spice.failed('just_delete_me');
        }
        var matchPartial = function(item) {
            var that = this;
            return (item.name.toLowerCase().indexOf(this) != -1 ||
                    item.domains.some(function(domain) { return domain.indexOf(this) != -1; }, that));
        }
        function normalizeDomains(api_result) {
            for (var i=0;i<api_result.length; i++) {
                if (!api_result[i].domains)
                    api_result[i].domains = [];
                else if (typeof(api_result[i].domains) === "string")
                    api_result[i].domains = [api_result[i].domains];
                for (var j=0; j<api_result[i].domains.length; j++) {
                    api_result[i].domains[j] = api_result[i].domains[j].toLowerCase();
                }
            }
        }
        function filterResults(api_result) {
            var results = api_result.filter(function(item) { return item.name.toLowerCase() === this;}, decodedQuery); // check for exact match by name
            if (results > 0)
                results = [results[0]]; // take only first exact match
            else {
                results = api_result.filter(function(item) { return item.domains.indexOf(this) != -1; }, decodedQuery); // check for exact domain match
            }
            if (results > 0)
                results = [results[0]]; // take only first exact match
            else {
                results = api_result.filter(matchPartial, decodedQuery); // match partial names and partial domains
            }
            return results;
        }
        normalizeDomains(api_result);
        api_result = filterResults(api_result);
        if (!api_result || api_result.length < 1) {
            return Spice.failed('just_delete_me');
        }
        Spice.add({
            id: "just_delete_me",
            name: "Answer",
            meta: {
                sourceName: 'Just Delete Me',
                sourceUrl: "http://justdelete.me/#" + decodedQuery
            },
            data: api_result,
            normalize: function(item) {
                return {
                    delete_url: item.url,
                    title: item.name,
                    url: "http://justdelete.me/#" + item.name,
                    subtitle: "Difficulty: " + DDG.capitalize(item.difficulty),
                    description: item.notes  ? item.notes :
                                 item.email  ? "Send an email to the provided address to delete your account." :
                                 item.url    ? "Follow the provided link to delete your account." :
                                 "No instructions provided."
                };
            },
            relevancy: {
                dup: 'name'
            },
            templates: {
                group: 'text',
                options: {
                    footer: Spice.just_delete_me.footer,
                    content: Spice.just_delete_me.content,
                    moreAt: true,
                    aux: false
                },
                variants: {
                    tileTitle: '1line-large',
                    tileFooter: '1line',
                    tileSnippet: 'large'
                },
                detail: api_result.length === 1 ? 'basic_info_detail' : false,
                item_detail: false
            }
        });
    };
}(this));
