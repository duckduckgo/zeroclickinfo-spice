function ddg_spice_today_in_history(api_response) {
    "use strict";

    if (!api_response) {
        return Spice.failed('today_in_history');
    }

    var item = $( $.parseXML(api_response) ).find('item');

    if (!item) {
        return Spice.failed('today_in_history');
    }

    var title = item.find('title').text();
    var link  = item.find('link').text();
    var text  = item.find('description').text();

    if (!title || !link || !text) {
        return Spice.failed('today_in_history');
    }

    Spice.add({
        data             : text,
        header1          : title + ' (Today in History)',
        sourceUrl       : link,
        sourceName      : 'History.com',
        templates: {
            item: Spice.today_in_history.today_in_history,
            detail: Spice.today_in_history.today_in_history
        },
        
    });
}
