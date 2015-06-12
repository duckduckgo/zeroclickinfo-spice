(function(env) {
    "use strict";
    env.ddg_spice_today_in_history = function(api_response) {

        if (!api_response) {
            return Spice.failed('today_in_history');
        }

        var item = $( $.parseXML(api_response) ).find('item');

        if (!item) {
            return Spice.failed('today_in_history');
        }

        Spice.add({
            id: "today_in_history",
            Name: "Today In History",
            data: item,
            meta: {
                sourceName: 'History.com',
                sourceUrl: 'http://www.history.com/this-day-in-history'
            },
            normalize: function(item) {
                console.log(item);
                var title = item.find('title').text();
                var link  = item.find('link').text();
                var text  = item.find('description').text();
                text = $('<div />').html(DDG.strip_html(text)).text();

                if (!title || !link || !text) {
                    return Spice.failed('today_in_history');
                }

                return {
                    title: title,
                    url: link,
                    text: text,
                }
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.today_in_history.content,
                }
            }
        });
    }
}(this));
