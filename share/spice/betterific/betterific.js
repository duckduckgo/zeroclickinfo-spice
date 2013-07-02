/* Taken from
   https://gist.github.com/821904 */
if (typeof(Number.prototype.number_with_delimiter) === 'undefined') {
  Number.prototype.number_with_delimiter = function(delimiter) {
    "use strict";
    var number = this + '', delimiter = delimiter || ',';
    var split = number.split('.');
    split[0] = split[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      '$1' + delimiter
    );
    return split.join('.');    
  };
}

function ddg_spice_betterific(api_result) {
  "use strict";
  if (!api_result.betterifs || !api_result.tags || !api_result.users) {
    return;
  }
  var kinds = ['betterifs', 'tags', 'users'];
  var s = 0;
  var kind;
  for (var i=kinds.length-1; i>=0; i--) {
    kind = kinds[i];
    if (!api_result[kind] || !api_result[kind][kind]) {
      return;
    }
    s += api_result[kind][kind].length;
  }
  if (s == 0) {
    return;
  }
  // Since we show 1 entity by default, subtract 1 here.
  api_result.cnt_more = s - 1;
  var obj_length, pp_fn;
  for (var i=kinds.length-1; i>=0; i--) {
    kind = kinds[i];
    if ((obj_length = api_result[kind][kind].length) > 0) {
      for (var j=obj_length; j>0; j--) {
        if (!api_result[kind][kind][j-1].id) {
          return;
        }
      }
    }
  }
  Spice.render({
    data             : api_result,
    header1          : api_result.q + ' (Betterific)',
    source_url       : encodeURI('http://betterific.com/search/' + api_result.q),
    source_name      : 'betterific',
    template_normal  : 'betterific',
    force_big_header : true,
    force_no_fold    : true
  });
}

/* Adapted from Betterific's lib/ruby_extensions.rb
 *   def dashed
 *     self.gsub(/[^a-z0-9\-\s]/i, '').squeeze(' ').gsub(/\s+/, '-')
 *   end
 */
Handlebars.registerHelper('dashedS', function(s) {
  "use strict";
  return s.replace(/[^a-z0-9\-\s]/gi, '').replace(/\s+/g, '-');
});

Handlebars.registerHelper('pluralize', function(number, single, plural) {
  "use strict";
  return parseInt(number).number_with_delimiter() + ' ' + ((parseInt(number) == 1) ? single : plural);
});

$('body').on('click', 'a.header', function() {
  $(this).closest('.kind-wrapper').find('.collapsible').toggle();
});
