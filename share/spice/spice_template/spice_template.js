function ddg_spice_plugin_name ( api_result ) {
  "use strict";

  /* Make sure result exists */

  Spice.render({
    data             : api_result,
    header1          : ' ',
    source_name      : ' ',
    source_url       : 'https://source.website.com',
    template_normal  : ' ',
    force_big_header : true
  });

  // Any private functions here
  function myPrivateFn ( param1, param2 ) {

  }

}


// Any Handlebars helpers here
Handlebars.registerHelper ('helper_name', function() {
  "use strict";

  var out;

  /* Logic to build output */

  return out;
});
