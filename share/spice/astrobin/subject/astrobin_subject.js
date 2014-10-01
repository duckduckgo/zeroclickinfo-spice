(function(env) {
    "use strict";

    env.ddg_spice_astrobin_subject = function(api_result) {
        if (!api_result || (api_result.objects.length < 1)) {
            return Spice.failed('astrosubject');
        }
        
        var script = $('[src*="/js/spice/astrobin/subject"]')[0],
        source = $(script).attr("src"),
        query = source.match(/subject\/([^\/]+)/)[1];

        Spice.add({
            id: "astrosubject",
            name: "Astrophotos",
            data: api_result.objects,
            meta: {
                itemType: "Astrophotos",
                sourceUrl: 'http://www.astrobin.com/search/?q=' + query + '&search_type=0&license=0&telescope_type=any&camera_type=any',
                sourceName: 'AstroBin'
            },
            normalize: function(item) {
                return {
                    h: item.url_regular,
                    j: item.url_real,
                    u: "http://www.astrobin.com/" + item.id,
                    ih: item.h,
                    iw: item.w,
                    i: item.title
                };
            },
            view: 'Images'
        });
    };
}(this));
