(function (env) {
    "use strict";
    
    function capitalizeWords(str) {
        return str.toLowerCase().replace( /\b\w/g, function (m) {
            return m.toUpperCase();
        });
    }
    
    env.ddg_spice_missing_kids = function (api_result) {
        
        if (!api_result || api_result.error) {
            Spice.failed('missing_kids');
        }
        
        var articles = api_result.rss.channel.item;
        if (articles.length == 0) Spice.failed('missing_kids');
        if (articles.length > 20) articles = articles.slice(0,20);
        
        var script = $('[src*="/js/spice/missing_kids/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/missing_kids\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);

        Spice.add({
            id: 'missing_kids',
            name: 'Missing Kids',
            data: articles,
            meta: {
                primaryText: 'Missing children in ' + decodedQuery,
                sourceName: 'National Center for Missing & Exploited Children',
                sourceUrl: 'http://www.missingkids.com',
                count: articles.length
            },
            templates: {
                group: 'media',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.missing_kids.footer
                }
            },
            normalize: function(item) {
                var title = item.title.text.replace(/.*\:/,"").replace(/\(.+\)/, "");
                title = capitalizeWords(title);
                
                var description = '',
                    subtitle = '',
                    age = '',
                    missingFrom = '',
                    phone = '';
                
                if (typeof item.description !== 'undefined') {
                    description = item.description.text;
                    description = DDG.strip_html(description);
                    description = description.replace(/&quot;/ig,"\"");
                    description = description.replace(/&#039;/ig,"'");
                    // removing PERSON'S NAME, 
                    description = description.replace(/^.+?,/,"");
                    
                    subtitle = description.replace(/Age Now: \d+\,/, "").replace(/Missing From [^\.]+\./, "").replace(/ANYONE.*/, "");
                    description = description.replace(/\bANYONE.+\)/,"Contact: ");
                    description = description.replace(/, Missing\: \d\d\/\d\d\/\d\d\d\d/,"");
                    
                    var chunks = description.split(".");
                    age = chunks[0];
                    missingFrom = chunks[1];
                    phone = chunks[2];
                    console.log(description);
                }
                var image = item.enclosure.url;
                image = image.replace("t.jpg", ".jpg");
                return {
                    title: title,
                    url: item.link.text,
                    description: null,
                    subtitle: subtitle,
                    image: image,
                    age: age,
                    location: missingFrom,
                    phone: phone
                };
            }
        });

    }
}(this));


