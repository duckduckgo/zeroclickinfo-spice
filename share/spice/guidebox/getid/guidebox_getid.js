(function(env){
    "use strict";    
    env.ddg_spice_guidebox_getid = function(api_result) {

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

            var isMobile = $('.is-mobile').length;

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
                    options: {
                        variant: "video",
                        price: true,
                        buy: Spice.guidebox_getid.buy
                    }
                },
                normalize: function(item) {
                    // We have to check if the required properties exist before we do anything.
                    // Returning null skips the item and prevents it from getting displayed.
                    if(!DDG.getProperty(item, 'episode_name') || !DDG.getProperty(item, 'season_number') || 
                       !DDG.getProperty(item, 'overview')) {
                        return null;
                    }
                    
                    var subtitle_tile = "Season "+ item.season_number+ ", #" + item.episode_number;
                    var subtitle_detail = "(Season "+ item.season_number+ ", #" + item.episode_number+")";

                    var abstract_length = (isMobile ? 175 : 500);
                    var abstract = Handlebars.helpers.ellipsis(item.overview, abstract_length);

                    var aired = "Originally aired "+ Handlebars.helpers.guideBox_getDate(item.first_aired)
                                + " on "+ metadata.network;
                    
                    return {
                        image: item.thumbnail_304x171,
                        img: item.thumbnail_400x225,
                        title: item.episode_name, 
                        ratingText: subtitle_tile,
                        heading: item.episode_name + subtitle_detail,
                        url: item.smart_url,
                        abstract: abstract,
                        price: aired
                    }
                },
//                 relevancy: {
//                     primary: [
//                         {required: 'episode_name'},
//                         {required: 'season_number'},
//                         {required: 'overview'}
//                     ]
//                }
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