function ddg_spice_today_in_history(api_response) {
    "use strict";

    if (!api_response) {
        return;
    }

    var item = $( $.parseXML(api_response) ).find('item');

    if (!item) {
        return;
    }

    var title = item.find('title').text();
    var link  = item.find('link').text();
    var text  = item.find('description').text();

    if (!title || !link || !text) {
        return;
    }

    Spice.render({
        data             : text,
        header1          : title + ' (Today in History)',
        source_url       : link,
        source_name      : 'History.com',
        template_normal  : 'today_in_history',
        force_big_header : true
    });
}
