function ddg_spice_npm (api_result) {
  "use strict";

  if (api_result.error) {
    return;
  }

  Spice.render({
    data              : api_result,
    force_big_header  : true,
    header1           : api_result.name + ' --- ' + api_result.version,
    source_name       : "spoonacular.com", // More at ...
    source_url        : 'http://spoonacular.com/' + api_result.name,
    template_normal   : 'npm',
    template_small    : 'npm'
  });
}
