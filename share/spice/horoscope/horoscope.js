function ddg_spice_horoscope(response) {
    "use strict";

    if (!response) {
        return;
    }

    var $item = $( $.parseXML(response) ).find('item'),
        query = DDG.get_query().toLowerCase().replace(/ horoscope|horoscope /g, ''),
        letters = query.split(''),
        $title, $text;

    letters[0] = letters[0].toUpperCase();

    $.each($item, function () {
        $title = $(this).find('title');

        if ($title.text().toLowerCase().indexOf(query) > -1) {
            $text = $(this).find('description').text();
        }
    });

    Spice.render({
        data             : $text.slice($text.indexOf('<p>') + 3, $text.indexOf('</p>')),
        header1          : 'Horoscope (' + letters.join('') + ')',
        source_url       : 'http://astrology.com/horoscopes/',
        source_name      : 'Astrology.com',
        template_normal  : 'horoscope',
        force_big_header : true,
        force_no_fold    : true
    });
}