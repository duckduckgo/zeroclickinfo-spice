function ddg_spice_plugin_name ( api_result ) {

  /* Make sure result exists */

  Spice.add({
    data             : api_result,
    header1          : ' ',
    sourceName      : ' ',
    sourceUrl       : 'https://source.website.com',
    template_normal  : ' ',
    
  });

  // Any private functions here
  function myPrivateFn ( param1, param2 ) {

  }

}


// Any Handlebars helpers here
Handlebars.registerHelper ('helper_name', function() {

  var out;

  /* Logic to build output */

  return out;
});