(function (env) {
    "use strict";
    env.ddg_spice_github_status = function(api_result) {
        
        if (!api_result) {
            return Spice.failed('github_status');
        }

        var d = Math.floor(new Date(api_result.created_on).getTime() / 1000),
            now = Math.floor(new Date().getTime() / 1000);

        //adds fallback for browsers that don't support Date instantiation by string
        if (typeof d !== 'undefined') {
            var timestamp = relativeDate(now - d);
        } else {
            var timestamp = api_result.created_on;
        }

        Spice.add({
            id: "github_status",
            name: "Status",
            data: api_result,
            meta: {
                sourceName: "GitHub",
                sourceUrl: "https://status.github.com/",
            },
            normalize: function(item) {
                return {
                    description: timestamp
                };
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.github_status.content,
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper("GithubStatus_ifCond", function(string1, string2, options) {
        if (string1 === string2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        } 
    });

    function relativeDate(delta) {
        var MINUTE = 60,
            HOUR = 60 * MINUTE,
            DAY = 24 * HOUR,
            MONTH = 30 * DAY,
            YEAR = 12 * MONTH;

        if (delta < 45*MINUTE){
            return Math.round(delta / MINUTE) + " minutes ago";
        } else if (delta < 90*MINUTE) {
            return 'an hour ago';
        } else if (delta < 24*HOUR){
            return Math.round(delta / HOUR) + " hours ago";
        } else if (delta < 48*HOUR){
            return 'yesterday';
        } else if (delta < 30*DAY){
            return Math.round(delta / DAY) + " days ago";
        } else if (delta < 12*MONTH){
            var months = Math.round(delta / MONTH);
            return (months === 1) ? 'a month ago' : months + " months ago";
        } else {
            var years = Math.round(delta / YEAR);
            return (years === 1) ? 'a year ago' : years + " years ago";
        }
    }
}(this));
