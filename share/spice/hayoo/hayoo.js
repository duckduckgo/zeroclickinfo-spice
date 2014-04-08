function ddg_spice_hayoo(results) {
  "use strict";

  if (!results.hits > 0) {
    return;
  }
  var query = DDG.get_query().replace(/\s*hayoo\s*/i, '');

  Spice.add({
      data             : results.functions[0],
      header1          : query + ' (Hayoo!)',
      sourceUrl       : results.functions[0].uri,
      sourceName      : 'Hackage',
      templates: {
            item: Spice.hayoo.hayoo,
            detail: Spice.hayoo.hayoo
        },
      
      
  });
}

Handlebars.registerHelper("strip_anchor", function(text) {
  "use strict";

  return text.replace(/<\/?(a|code|strong)[^>]*>/g, "");
});
