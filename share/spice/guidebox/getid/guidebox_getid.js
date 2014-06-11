(function(env){    
    env.ddg_spice_guidebox_getid = function(api_result) {
        "use strict";

        if (!api_result || !api_result.results) {
          return Spice.failed('guidebox');
        }

        var SKIP_ARRAY = ["online","tv","episode","episodes","free","guidebox","watch","full"],
            results = api_result.results.result, 
            relevant;

        // Check which show is relevant to our query.
        $.each(results, function(key, result) {
            if (DDG.isRelevant(result.title, SKIP_ARRAY, 3) && !relevant) {
                relevant = result;
            }
        });

        // Exit if we didn't find anything relevant.
        if (!relevant) {
            return;
        }

        // Prevent jQuery from appending "_={timestamp}" in our url.
        $.ajaxSetup({
            cache: true
        });

        var metadata = {
            res_title : relevant.title,
            network : relevant.network,
            more : relevant.url
        };

        var url = '/js/spice/guidebox/lastshows/series/' + relevant.id;

        $.getJSON(url, function(api_result) {
            
            if(!api_result){
                return Spice.failed('guidebox');
            }

        console.log(toArray(api_result.results.result));

            Spice.add({
                id: 'guidebox',
                name: 'TV',
                data: toArray(api_result.results.result),
                meta: {
                    sourceName: "Guidebox",
                    sourceUrl: metadata.more,
                    itemType: 'episodes of ' + metadata.res_title
                },
                templates: {
                    group: 'media',
                    detail: 'products_detail',
                    item_detail: 'products_item_detail',
                    options: {
                        variant: "video",
                        buy: Spice.guidebox_getid.buy
                    }
                },
                normalize: function(item){
                    console.log(item);
                    return {
                        image: item.thumbnail_304x171,
                        img: item.thumbnail_400x225,
                        title: item.episode_name,
                        ratingText: 'Season '+ item.season_number + ' #'+ item.episode_number,
                        heading: item.episode_name,
                        url: item.smart_url,
                        network: metadata.network
                    }
                },
                relevancy: {
                    primary: [
                        {required: 'episode_name'},
                    ]
                }
            });
        });
}

    function toArray(obj) {
        var result = [];
        if($.isArray(obj)) {
            return obj;
        } else {
            $.each(obj, function(key, value) {
                result[key] = value;
            });
            return result;
        }
    }

    Handlebars.registerHelper("guideBox_getDate", function(first_aired) {

        var aired = DDG.getDateFromString(first_aired),
        days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        months = [ 'January','February','March','April','May','June','July','August','September','October','November','December'];

        return days[aired.getDay()] + ", " + months[aired.getMonth()] + " " + aired.getDate() + ", " + aired.getFullYear()
    });
}(this));