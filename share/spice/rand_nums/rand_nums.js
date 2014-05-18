(function(env) {
    "use strict";
    env.ddg_spice_rand_nums = function(api_result) {
    
        var min;
        var max;

        // Get the original query.
        // We're going to pass this to the header.
        var query = "";
        $("script").each(function() {
            var matched, result;
            matched = $(this).attr("src");
            if(matched) {
                result = matched.match(/\/js\/spice\/rand_nums\/([^\/]+)\/(.+)/);
                if(result) {
                    min = result[1];
                    max = result[2];
                }
            }
        });

        min = min || 0;
        max = max || 100;

        Spice.add({
            id: "rand_nums",
            name:"Random Numbers",
            data: {result: api_result},
            meta: {
                sourceUrl: 'http://www.random.org/integers/?num=100&min='
                                    + min + '&max=' + max + '&col=5&base=10&format=html&rnd=new',
                sourceName: 'Random.org',
                sourceIcon: true
            },
            templates: {
                group: "text",
                options:{
                    content: Spice.rand_nums.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
