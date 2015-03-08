(function (env) {
    "use strict";
    env.ddg_spice_age_of_celebrity = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || typeof api_result.query.pages['-1'] !== 'undefined') {
            return Spice.failed('age_of_celebrity');
        }
        
        $.each(api_result.query.pages, function(pageId, page) {
            var living = page.extract.match(/born([ a-z0-9]*[;,])? ([a-z]* [0-9]*,? [0-9]*)/i),
                deceased = page.extract.match(/([a-z]* [0-9]*,? [0-9]*)( \[.*\])? [\-–] ([a-z]* [0-9]*,? [0-9]*)/i),
                celebName = page.title,
                pageUrl = page.fullurl,
                thumbnail = false;

            if(typeof page.thumbnail !== "undefined") {
                thumbnail = page.thumbnail.source;
            }

            if(deceased) {
                var birthDate = deceased[1],
                    birthTimestamp = Date.parse(birthDate),
                    deathDate = deceased[3],
                    deathTimestamp = Date.parse(deathDate),
                    description = celebName + ' was born ' + birthDate + ' and died ' + deathDate,
                    age = Math.floor((deathTimestamp - birthTimestamp) / (60*60*24*365*1000)); //1 year in milliseconds
            } else if(living) {
                var birthDate = living[2],
                    birthTimestamp = Date.parse(birthDate),
                    description = celebName + ' was born ' + birthDate,
                    age = Math.floor((Date.now() - birthTimestamp) / (60*60*24*365*1000)); //1 year in milliseconds
            } else {
                return Spice.failed('age_of_celebrity');
            }

            // Render the response
            Spice.add({
                id: "age_of_celebrity",
                data: {
                    title: age + ' years old',
                    icon: thumbnail,
                    description: description
                },
                name: "Age of " + celebName,
                meta: {
                    sourceName: "Wikipedia.com",
                    sourceUrl: pageUrl
                },
                templates: {
                    group: 'icon',
                    detail: false,
                    item_detail: false,
                    options: {
                        moreAt: true
                    }
                }
            });
        });
        
        return;

    };
}(this));
