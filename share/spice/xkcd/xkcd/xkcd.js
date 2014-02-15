function ddg_spice_xkcd_xkcd(api_result) {
  if (!api_result.img || !api_result.alt) return;

  Spice.render({
      data             : api_result,
      header1          : api_result.safe_title + " (xkcd)",
      source_url       : 'http://xkcd.com/' + api_result.num,
      source_name      : 'xkcd',
      template_normal  : 'xkcd',
      force_big_header : true,
      force_no_fold    : true,
  });

  $.getScript('/js/spice/xkcd/latest/');
}

function ddg_spice_xkcd_latest(api_result) {
  //determine if there needs to be a next button
  var url = jQuery('#xkcd-next-link').attr('href').split('+');
  var displayed_next = url[url.length-1];
  if (parseInt(displayed_next) > parseInt(api_result.num)){
    jQuery('#xkcd-next-link').remove();
  }
}

Handlebars.registerHelper("previousNum", function(num, options) {
    if(num > 1) {
        return options.fn({num: num - 1});
    }
});

Handlebars.registerHelper("nextNum", function(num, options) {
    return options.fn({num: num + 1});
});
