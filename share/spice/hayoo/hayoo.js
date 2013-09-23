function ddg_spice_hayoo(results) {

  if (!results.hits > 0) return;
  var query = DDG.get_query().replace(/\s*hayoo\s*/i, '');

  Spice.render({
      data             : results.functions[0],
      header1          : query + ' (Hayoo!)',
      source_url       : results.functions[0].uri,
      source_name      : 'Hackage',
      template_normal  : 'hayoo',
      force_big_header : true,
      force_no_fold    : true,
  });
}

Handlebars.registerHelper("strip_anchor", function(text) {
  return text.replace(/<\/?(a|code|strong)[^>]*>/g, "");
});