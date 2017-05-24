(function (env) {
    "use strict";
    env.ddg_spice_today_in_history = function(api_response) {

        if (!api_response || !api_response.query) {
            return Spice.failed('today_in_history');
        }

        // Extract our query
        var script = $('[src*="/js/spice/today_in_history/"]')[0],
            source = $(script).attr('src'),
            ourquery = source.match(/today_in_history\/([^\/]+)/)[1];
            ourquery = ourquery.replace("_", " ");

        // Extract data
        var item;
        for (var key in api_response.query.pages) {
            if (api_response.query.pages[key].hasOwnProperty("revisions"))
                item = api_response.query.pages[key].revisions[0]["*"];
        }

        if (!item) {
            return Spice.failed('today_in_history');
        }

        // Extract the data we want to organize
        var temp_a = item.split("==Events=="),
            temp_b = temp_a[1].split("==Births=="),
            temp_c = temp_b[1].split("==Deaths=="),
            temp_d = temp_c[1].split("==Holidays and observances==");

        var events = $.trim(temp_b[0]).split("\n");

        // We will use these when we get the filters
        // var births = $.trim(temp_c[0]).replace(/\<\!--(.|\n)*/,"").split("\n");
        // var deaths = $.trim(temp_d[0]).replace(/\<\!--(.|\n)*/,"").split("\n");

        // Organize data in array
        var temp,
            data = [],
            temp_string;

        for (var i = 0; i < events.length; i++) {
            temp = events[i].split(" &ndash; ");
            temp_string = (temp.slice(1)).join(" ");
            if (temp_string.length > 0) {
                data.push({
                    wikiYear: temp[0].replace(/\*/,""),
                    wikiText: temp_string, ttype: "event"}
                );
            }
        }

        Spice.add({
            id: "today_in_history",
            name: "Answer",
            data: data,
            meta: {
                itemType: "Historical Events",
                sourceUrl: 'http://en.wikipedia.org/wiki/'+ ourquery,
                sourceName: 'Wikipedia',
                hideModeSwitch: true,
                itemsExpand: true,
                itemsHighlight: false
            },
            normalize: function(item){
                var html = wiki_to_html(item.wikiText),
                    plaintext = $("<p>" + html + "</p>").text();

                return {
                    canExpand: plaintext.length > 150 && !DDG.device.isMobile,
                    text: html,
                    year: wiki_to_html(item.wikiYear)
                };
            },
            templates: {
                item: 'base_expanding_item',
                options: {
                    content: Spice.today_in_history.content
                }
            }
        });
    };


    function wiki_to_html (string) {
        return string
            .replace(/\*?\s*(\S*)\[\[(.*?)\]\]([\w\'\"]*)/g, function (m, prefix, l, postfix) { // internal link or image
                var parsed_value = l.split(/\|/),
                    link = parsed_value.shift(),
                    text = parsed_value.length ? parsed_value : link;

                if (prefix) {
                   text = prefix + text;
                }

                if (postfix) {
                   text = text + postfix;
                }

                return ' <a class="tx-clr--dk" href="' + link + '">' + text + '</a>';
            })

            .replace(/\*?\s*\{\{(.*?)\}\}/g, function (m, l) {
                var parsed_value = l.split(/\|/);
                var text;
                var link;

                if (parsed_value[0] == "convert")
                {
                    return " " + parsed_value[1] + " " + parsed_value[2];
                }

                if (parsed_value.length == 4) {
                    parsed_value.splice(-1,1);
                }

                if (parsed_value.length == 2) {
                    link = parsed_value.join("_");
                    text = parsed_value.join(" ");
                }

                if (parsed_value.length == 3) {
                    parsed_value[2] = "(" + parsed_value[2] + ")";
                    link = parsed_value.join("_");
                    parsed_value.splice(-1,1);
                    text = parsed_value.join(" ");
                }

                return ' <a class="tx-clr--dk" href="' + link + '">' + text + '</a>';
            })

            .replace(/'''(.*?)'''/g, function (m, l) {
                return '<strong>' + l + '</strong>';
            })

            .replace(/''(.*?)''/g, function (m, l) {
                return '<em>' + l + '</em>';
            });
    }
} (this));
