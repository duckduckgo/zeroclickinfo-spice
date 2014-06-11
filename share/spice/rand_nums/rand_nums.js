!function(env) {
    "use strict";
    env.ddg_spice_rand_nums = function(api_result) {
        if (!api_result) {
            return Spice.failed("rand_nums");
        }
        var min;
        var max;
        // Get the original query.
        // We're going to pass this to the header.
        var query = "";
        $("script").each(function() {
            var matched, result;
            if (matched = $(this).attr("src"), matched) {
                if (result = matched.match(/\/js\/spice\/rand_nums\/([^\/]+)\/(.+)/), result) {
                    min = result[1], max = result[2];
                }
            }
        }), min = min || 0, max = max || 100, Spice.add({
            id: "rand_nums",
            name: "Random Numbers",
            data: {
                result: api_result
            },
            meta: {
                sourceUrl: "http://www.random.org/integers/?num=100&min=" + min + "&max=" + max + "&col=5&base=10&format=html&rnd=new",
                sourceName: "Random.org",
                sourceIcon: !0
            },
            templates: {
                group: "text",
                options: {
                    content: Spice.rand_nums.content,
                    moreAt: !0
                }
            }
        });
    };
}(this);