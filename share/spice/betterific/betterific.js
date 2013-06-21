/* tags: [
 * {
 * id: 403327,
 * name: "iphones",
 * cached_image_url: "http://production-assets0.betterifbox.com/images/tinyc/default.jpg"
 * },
 */
function ddg_spice_betterific(api_result) {
  if (!api_result.tags || (api_result.tags.length == 0) || !api_result.tags[0].id || !api_result.tags[0].name || !api_result.tags[0].cached_image_url) {
    return;
  }
  var spice_params = api_result.tags[0];
  spice_params.url_params = {
    id   : spice_params.id,
    name : spice_params.name
  };
  spice_params.betterifs_s = spice_params.betterifs_count + ' betterif' + ((spice_params.betterifs_count == 1 ? '' : 's'));
  spice_params.followers_s = spice_params.followers_count + ' follower' + ((spice_params.followers_count == 1 ? '' : 's'));
  Spice.render({
    data             : spice_params,
    header1          : api_result.tags[0].name + ' (Betterific)',
    /* Adapted from lib/ruby_extensions.rb
     *   def dashed
     *     self.gsub(/[^a-z0-9\-\s]/i, '').squeeze(' ').gsub(/\s+/, '-')
     *   end
     */
    source_url       : 'http://betterific.com/' + api_result.tags[0].name.replace(/[^a-z0-9\-\s]/gi, '').replace(/\s+/g, '-') + '/' + api_result.tags[0].id,
    source_name      : 'betterific',
    template_normal  : 'betterific',
    force_big_header : true,
    force_no_fold    : true
  });
}

Handlebars.registerHelper("tagUrl", function(params) {
  return 'http://betterific.com/' + params.name.replace(/[^a-z0-9\-\s]/gi, '').replace(/\s+/g, '-') + '/' + params.id;
});
