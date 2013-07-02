/* Taken from
   https://gist.github.com/821904 */
if (typeof(Number.prototype.number_with_delimiter) === 'undefined') {
  Number.prototype.number_with_delimiter = function(delimiter) {
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
  var short_betterif_name_length = 50;
  var betterif_shortened_name = function(o) {
    if (o.name.length > short_betterif_name_length) {
      o.shortened_name = o.name.slice(0, short_betterif_name_length) + '...';
    }
    return o;
  };
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
        if (kind == 'betterifs') {
          // We have to set up each betterif's shortened_name.
          api_result[kind][kind][j-1] = betterif_shortened_name(api_result[kind][kind][j-1]);
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

/* Adapted from lib/ruby_extensions.rb
 *   def dashed
 *     self.gsub(/[^a-z0-9\-\s]/i, '').squeeze(' ').gsub(/\s+/, '-')
 *   end
 */
function dashed_s(s) {
  "use strict";
  return s.replace(/[^a-z0-9\-\s]/gi, '').replace(/\s+/g, '-');
}

Handlebars.registerHelper('betterifUrl', function(params) {
  "use strict";
  return 'http://betterific.com/' + dashed_s(params.user.username) + '/' + dashed_s(params.name) + '/' + params.id;
});

Handlebars.registerHelper('tagUrl', function(params) {
  "use strict";
  return 'http://betterific.com/' + dashed_s(params.name) + '/' + params.id;
});

Handlebars.registerHelper('userUrl', function(params) {
  "use strict";
  return 'http://betterific.com/innovator/' + dashed_s(params.username) + '/' + params.id;
});

Handlebars.registerHelper('pluralize', function(number, single, plural) {
  "use strict";
  return parseInt(number).number_with_delimiter() + ' ' + ((parseInt(number) == 1) ? single : plural);
});

// The More link (which also serves as the Less link) at the bottom of the
// plugin should show (or hide) the extra content.
$('body').on('click', '#spice_betterific_more', function() {
  $('#spice_betterific').find('.obj-wrapper').not(':first-child').slideToggle(200, function() {
    $('#spice_betterific').find('#spice_betterific_more').find('span').toggle();
  });
  $('#spice_betterific').find('.left-img').toggle();
  $('#spice_betterific').find('.kind-wrapper').not(':first-child').toggle();
});
// The More and Less links next to long betterif names should hide and show the
// truncated part of the names.
$('body').on('click', '.betterifs .betterif-name .togglers a', function() {
  $(this).parent().children().toggle();
  $(this).closest('.betterif-name').find('.name-text').toggle();
});
