function ddg_spice_xkcd(api_result) {
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
}

Handlebars.registerHelper("previousNum", function(num) {
  if(num > 0) {
    return num - 1;
  }
});