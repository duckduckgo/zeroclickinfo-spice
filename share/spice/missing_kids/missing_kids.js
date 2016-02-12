(function (env) {
    "use strict";

    function capitalizeWords(str) {
        return str.toLowerCase().replace( /\b\w/g, function (m) {
            return m.toUpperCase();
        });
    }

    // get name from "Missing: FIRST LAST (AA)."
    var nameReg = /^\w+\: ([^\(]+) .+$/;
    // get date from "Missing: ##/##/####."
    var dateReg = /(\d{2}\/\d{2}\/\d{4})/;
    // get location from "Missing from: <city>, <state>."
    var locReg = /Missing From ([^\,]+?)\,([^\.]+?)\./;
    // get state from "Age Now: ##,"
    var ageReg = /Age Now: (\d+),/;
    // get phone from "... #-###-###-####."
    var phoneReg = /(\d-\d{3}-\d{3}-\d{4})/;
    // get contact name from "Contact: ..."
    var contactReg = /CONTACT: ([^\(\d]+)/;

    env.ddg_spice_missing_kids = function (api_result) {

        if (!api_result || api_result.error) {
            Spice.failed('missing_kids');
        }

        var articles = api_result.rss.channel.item;
        if (articles.length === 0) {
            Spice.failed('missing_kids');
        }

        if (articles.length > 20) {
            articles = articles.slice(0,20);
        }

        var script = $('[src*="/js/spice/missing_kids/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/missing_kids\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);

        DDG.require("moment.js", function(){

            moment.locale('en', {
                relativeTime : {
                    future: "in %s",
                    past:   "%s ago",
                    s:  "s",
                    m:  "1m",
                    mm: "%dm",
                    h:  "anh",
                    hh: "%dh",
                    d:  "1d",
                    dd: "%dd",
                    M:  "1mo",
                    MM: "%dmo",
                    y:  "1y",
                    yy: "%dy"
                }
            });

            Spice.add({
                id: 'missing_kids',
                name: 'Missing Kids',
                signal: "high",
                data: articles,
                meta: {
                    primaryText: 'Missing children in ' + decodedQuery,
                    sourceName: is_mobile ? 'NCMEC' : 'National Center for Missing & Exploited Children',
                    sourceUrl: 'http://www.missingkids.com',
                    count: articles.length
                },
                templates: {
                    group: 'media',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.missing_kids.footer
                    },
                    variants:{
                        tileTitle: "1line"
                    }
                },
                normalize: function(item) {
                    var title = nameReg.exec(item.title.text)[1];
                    var description = DDG.strip_html(item.description.text)
                        .replace(/&quot;/ig,"\"")
                        .replace(/&#039;/ig,"'");

                   // remove property so it's not used template
                    delete item.description;

                    var date = dateReg.exec(description)[1],
                        length = moment(date).fromNow(true);

                    date = moment(date).format("MMM Do, YYYY");

                    var phone = phoneReg.exec(description);

                    return {
                        title: capitalizeWords(title),
                        subtitle: date + " (" + length + ")",
                        url: item.link.text,
                        image: item.enclosure.url.replace("t.jpg", ".jpg"),
                        age: ageReg.exec(description)[1],
                        city: capitalizeWords( locReg.exec(description)[1] ),
                        state: locReg.exec(description)[2],
                        contact: phone ? phone[1] : contactReg.exec(description)[1].replace("Police Department", "PD")
                    };
                },
                relevancy: {
                    primary: [
                        {required: 'description'},
                    ]
                }
            });
        });
    };
}(this));
