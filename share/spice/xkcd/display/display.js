function ddg_spice_xkcd_display(api_result) {
  if (!api_result.img || !api_result.alt) return;

  $.getJSON('/js/spice/xkcd/latest/', function(data){
    api_result.has_next = parseInt(data.num) > parseInt(api_result.num);
    
    Spice.render({
      data             : api_result,
      header1          : api_result.safe_title + " (xkcd)",
      source_url       : 'http://xkcd.com/' + api_result.num,
      source_name      : 'xkcd',
      template_normal  : 'xkcd',
      force_big_header : true,
      force_no_fold    : true,
    });
  });
}

Handlebars.registerHelper("previousNum", function(num, options) {
    if(num > 1) {
        return options.fn({num: num - 1});
    }
});

Handlebars.registerHelper("nextNum", function(num, options) {
    return options.fn({num: num + 1});
});
