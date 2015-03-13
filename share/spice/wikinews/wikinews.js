(function (env) {
    "use strict";
    env.ddg_spice_wikinews = function(api_result){

        if (api_result.error) {
            return Spice.failed('wikinews');
        }

        Spice.add({
            id: "wikinews",
            name: "Wikinews",
            data: api_result.query.categorymembers,
            meta: {
                total: api_result.query.categorymembers.length,
                sourceName: 'Wikinews articles',
                sourceUrl: "https://en.wikinews.org/wiki/Main_Page",
                itemType: "Latest Wikinews articles"
            },
            normalize: function(item) {
                var timestamp = Math.floor(new Date(item.timestamp).getTime()/1000);
                var current_timestamp = Math.floor(new Date().getTime()/1000);

                return {
                    title: item.title,
                    url: "https:///en.wikinews.org/?curid=" + item.pageid,
                    post_domain: "wikinews.org",
                    date_from: timeDifference(current_timestamp, timestamp),
                };
            },
            templates: {
                group: 'text',
                options: {
                    footer: Spice.wikinews.footer
                },
                detail: false,
                item_detail: false,
                variants: {
                    tileTitle: "3line-small",
                }
            }
        });

        function timeDifference(current, previous) {

            var sPerMinute = 60;
            var sPerHour = sPerMinute * 60;
            var sPerDay = sPerHour * 24;
            var sPerMonth = sPerDay * 30;
            var sPerYear = sPerDay * 365;

            var elapsed = current - previous;

            if (elapsed < sPerMinute) {
                 return Math.round(elapsed) + ' seconds ago';
            }

            else if (elapsed < sPerHour) {
                 return Math.round(elapsed/sPerMinute) + ' minutes ago';
            }

            else if (elapsed < sPerDay ) {
                 return Math.round(elapsed/sPerHour ) + ' hours ago';
            }

            else if (elapsed < sPerMonth) {
                return Math.round(elapsed/sPerDay) + ' days ago';
            }

            else if (elapsed < sPerYear) {
                return Math.round(elapsed/sPerMonth) + ' months ago';
            }

            else {
                return Math.round(elapsed/msPerYear ) + ' years ago';
            }
        }
    };
}(this));
