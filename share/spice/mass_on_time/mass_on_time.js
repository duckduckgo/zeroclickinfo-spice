function ddg_spice_mass_on_time (api_result) {
  if (api_result.error) return;

  Spice.render({
     data              : api_result,
     force_big_header  : true,
     header1           : api_result.name + ' (' + api_result.version + ')',
     source_name       : "Mass On Time",
     source_url        : 'http://massontime.com/' + api_result.name,
     template_normal   : 'mass_on_time'
});
}
