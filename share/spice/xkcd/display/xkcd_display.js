function ddg_spice_xkcd_display(api_result) {
  if (!api_result.img || !api_result.alt) return;

  //calls our endpoint to get the number of the latest comic
  $.getJSON('/js/spice/xkcd/latest/', function(data){

    //if we are looking at the latest comic, don't display the 'next' link
    api_result.has_next = parseInt(data.num) > parseInt(api_result.num);

    // Add exception for comic 1335.
    if(api_result.num === 1335) {
	api_result.img = 'http://imgs.xkcd.com/comics/now/12h30m.png';
    }
    
    Spice.add({
      data             : api_result,
      header1          : api_result.safe_title + " (xkcd)",
      sourceUrl       : 'http://xkcd.com/' + api_result.num,
      sourceName      : 'xkcd',
      template_normal  : 'xkcd_display',
      
      
    });
  });
}

//gets the number for the previous comic
Handlebars.registerHelper("previousNum", function(num, options) {
    if(num > 1) {
        return options.fn({num: num - 1});
    }
});

//gets the number for the next comic 
Handlebars.registerHelper("nextNum", function(num, options) {
    return options.fn({num: num + 1});
});
