(function(env) {
  "use strict";

  env.ddg_spice_wgha = function(api_result) {

   if (api_result.length == 0) {
     return Spice.failed('wgha');
   }

   var query = DDG.get_query();
   var sourceUrl = 'http://www.wasgehtheuteab.de';

   Spice.add({
    id: 'wgha',
    name: 'Events',

    data: api_result,

    meta: {
      sourceUrl: sourceUrl,
      sourceName: 'Was geht heute ab?',
      sourceIcon: true,
      itemType: 'Events'
    },
    template_group: 'base',
    templates: {
      options: {
        content: Spice.wgha.content
      },
      detail: false,
      item_detail: false
    }
  });
 };

 Handlebars.registerHelper("WGHA_formatDate", function(created_at) {
  var date = new Date(created_at);
  if (date == null) {
   var pattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
   var match = pattern.exec(created_at);
   date = new Date(match[1], match[2]-1, match[3], match[4], match[5], match[6]);
  }
  return date.getUTCDate() + "." + date.getUTCMonth() + "." + date.getUTCFullYear() +" ab " + date.getUTCHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + "Uhr";
});
}(this));
