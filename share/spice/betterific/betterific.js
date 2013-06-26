function ddg_spice_betterific(api_result) {
  "use strict";
  if (!api_result.betterifs || !api_result.tags || !api_result.users) {
    return;
  }
  var short_betterif_name_length = 55;
  // We have to build URLs for each entity, and since Handlebars templates
  // can't take multiple arguments, we have to build some text snippets.
  var kinds = {
    betterifs : function(o) {
      o.url_params = {
        id       : o.id,
        name     : o.name,
        username : o.user.username
      };
      o.upvotes_s = naive_pluralize_with_count('upvote', o.upvotes_count);
      o.downvotes_s = naive_pluralize_with_count('downvote', o.downvotes_count);
      if (o.name.length > short_betterif_name_length) {
        o.shortened_name = o.name.slice(0, short_betterif_name_length);
      }
      return o;
    },
    tags      : function(o) {
      o.url_params = {
        id   : o.id,
        name : o.name
      };
      o.betterifs_s = naive_pluralize_with_count('betterif', o.betterifs_count);
      o.followers_s = naive_pluralize_with_count('follower', o.followers_count);
      return o;
    },
    users     : function(o) {
      o.url_params = {
        id       : o.id,
        username : o.username
      };
      o.betterifs_s = naive_pluralize_with_count('betterif', o.betterifs_count);
      o.followers_s = naive_pluralize_with_count('follower', o.followers_count);
      o.upvotes_given_s = naive_pluralize_with_count('upvote', o.upvotes_given_count) + ' given';
      o.upvotes_received_s = naive_pluralize_with_count('upvote', o.upvotes_received_count) + ' received';
      return o;
    }
  };
  var s = 0;
  var cnt_more = 0;
  //api_result.cnt_more = 0;
  for (var kind in kinds) {
    if (kinds.hasOwnProperty(kind)) {
      if (!api_result[kind] || !api_result[kind][kind]) {
        return;
      }
      s += api_result[kind][kind].length;
      if (api_result[kind][kind].length > 1) {
        cnt_more += api_result[kind][kind].length - 1;
      }
    }
  }
  if (s == 0) {
    return;
  }
  api_result.cnt_more = cnt_more;
  var obj_length, pp_fn;
  for (var kind in kinds) {
    if (kinds.hasOwnProperty(kind)) {
      if ((obj_length = api_result[kind][kind].length) > 0) {
        pp_fn = kinds[kind];
        for (var j=obj_length; j>0; j--) {
          if (!api_result[kind][kind][j-1].id) {
            return;
          }
          api_result[kind][kind][j-1] = pp_fn(api_result[kind][kind][j-1]);
          // We have to set up each betterif's User.
          if (kind == 'betterifs') {
            console.log(api_result[kind][kind][j-1].user);
            api_result[kind][kind][j-1].user = kinds.users(api_result[kind][kind][j-1].user);
          }
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

function naive_pluralize(s, c) {
  "use strict";
  return (parseInt(c) == 1) ? s : (s + 's');
}

function naive_pluralize_with_count(s, c) {
  "use strict";
  return c + ' ' + naive_pluralize(s, c);
}

Handlebars.registerHelper('betterifUrl', function(params) {
  "use strict";
  return 'http://betterific.com/' + dashed_s(params.username) + '/' + dashed_s(params.name) + '/' + params.id;
});

Handlebars.registerHelper('tagUrl', function(params) {
  "use strict";
  return 'http://betterific.com/' + dashed_s(params.name) + '/' + params.id;
});

Handlebars.registerHelper('userUrl', function(params) {
  "use strict";
  return 'http://betterific.com/innovator/' + dashed_s(params.username) + '/' + params.id;
});

// The More link (which also serves as the Less link) at the bottom of the
// plugin should show (or hide) the extra content.
$('body').on('click', '#spice_betterific_more', function() {
  $('#spice_betterific').find('.obj-wrapper').not(':first-child').slideToggle(200, function() {
    $('#spice_betterific').find('#spice_betterific_more').find('span').toggle();
  });
});
// The More and Less links next to long betterif names should hide and show the
// truncated part of the names.
$('body').on('click', '.betterifs .betterif-name .togglers a', function() {
  $(this).parent().children().toggle();
  $(this).closest('.betterif-name').find('.name-text').toggle();
});
