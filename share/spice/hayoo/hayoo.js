function ddg_spice_hayoo(results) {
  if (!results.hits > 0) return;

  var query = DDG.get_query().replace(/\s*hayoo\s*/i, '');

  code = results.functions[0];

  if (code.description != '')
      code.description = code.description
                             .replace(/<a>/g,'')
                             .replace(/<\/a>/g,'');
  
  Spice.render({
      data             : code,
      header1          : query + ' (Hayoo!)',
      source_url       : code.uri,
      source_name      : 'Hackage',
      template_normal  : 'hayoo',
      force_big_header : true,
      force_no_fold    : true,
  });
}
