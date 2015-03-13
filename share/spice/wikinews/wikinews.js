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
                count: api_result.query.categorymembers.length,
                itemType: 'Wikinews articles'
            },
            normalize: function(item) {
                var timestamp = new Date(item.timestamp).getTime()/1000;
                var current_timestamp = new Date().getTime()/1000;

                return {
                    title: item.title,
                    url: "https:///en.wikinews.org/?curid=" + item.pageid,
                    post_domain: "wikinews.org",
                    date_from: timeDifference(current_timestamp, timestamp),
                };
            },
            templates: {
                item: 'text'
            }
        });

        function timeDifference(current, previous) {

            var msPerMinute = 60 * 1000;
            var msPerHour = msPerMinute * 60;
            var msPerDay = msPerHour * 24;
            var msPerMonth = msPerDay * 30;
            var msPerYear = msPerDay * 365;

            var elapsed = current - previous;

            if (elapsed < msPerMinute) {
                 return Math.round(elapsed/1000) + ' seconds ago';
            }

            else if (elapsed < msPerHour) {
                 return Math.round(elapsed/msPerMinute) + ' minutes ago';
            }

            else if (elapsed < msPerDay ) {
                 return Math.round(elapsed/msPerHour ) + ' hours ago';
            }

            else if (elapsed < msPerMonth) {
                return Math.round(elapsed/msPerDay) + ' days ago';
            }

            else if (elapsed < msPerYear) {
                return Math.round(elapsed/msPerMonth) + ' months ago';
            }

            else {
                return Math.round(elapsed/msPerYear ) + ' years ago';
            }
        }
    };
}(this));
