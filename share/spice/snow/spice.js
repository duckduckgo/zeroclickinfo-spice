function nrio(ir) {
    "use strict";
    var snippet = '',
        location_display = '';
    if (ir && ir.answer) {
        var answer = ir.answer.replace(/[ ]+/, ' '),
            forecast = ir.forecast.replace(/[ ]+/, ' '),
            // Titleize regexp from Underscore.string.
            location = ir.location.replace(/[ ]+/, ' ').replace(/(?:^|\s)\S/g, function(c) { 
                return c.toUpperCase(); 
            });

        snippet = '<b>' + answer + '</b>';
        if (ir.location && ir.forecast) {
            snippet += '; ' + forecast;
            location_display = ' (' + location + ')';
            snippet += location_display;
        } else {
            return;
        }
        
        var items = [[]];
        items[0] = {
            a: snippet,
            h: 'Is it snowing yet?',
            s: 'Is It Snowing Yet?',
            u: 'http://isitsnowingyet.org/check?q=' + location,
            force_big_header: true
        };
        nra(items, 0, 1);
    }
}

