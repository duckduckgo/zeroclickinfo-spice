function ddg_spice_xkcd_display(api_result) {
  "use strict";

  if (!api_result.img || !api_result.alt) {
    return Spice.failed('xkcd');
  }

  //calls our endpoint to get the number of the latest comic
  $.getJSON('/js/spice/xkcd/latest/', function(data){

    //if we are looking at the latest comic, don't display the 'next' link
    api_result.has_next = parseInt(data.num) > parseInt(api_result.num);

    // Add exception for comic 1335.
    if(api_result.num === 1335) {
		api_result.img = 'http://imgs.xkcd.com/comics/now/12h30m.png';
    }
    
    Spice.add({
		id: 'xkcd',
		data: api_result,
		name: 'Comics',
		meta: {
            sourceUrl       : 'http://xkcd.com/' + api_result.num,
            sourceName      : 'xkcd',
            sourceIcon      : true
		},
    templates: {
      group: 'base',
      options: {
        content: Spice.xkcd_display.content,
        moreAt: true
                }
            }
    });
  });
}

//gets the number for the previous comic
Handlebars.registerHelper("xkcd_previousNum", function(num, options) {
    "use strict";

    if(num > 1) {
        return options.fn({num: num - 1});
    }
});

//gets the number for the next comic 
Handlebars.registerHelper("xkcd_nextNum", function(num, options) {
    "use strict";

    return options.fn({num: num + 1});
});
