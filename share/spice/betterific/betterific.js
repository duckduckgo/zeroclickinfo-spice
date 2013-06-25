function ddg_spice_betterific(api_result) {
  if (!api_result.betterifs || !api_result.tags || !api_result.users) {
    return;
  }
  var kinds = [
    ['betterifs', function(o) {
      o.url_params = {
        id       : o.id,
        name     : o.name,
        username : o.user.username
      };
      return o;
    }, function(o) {
      o.upvotes_s = naive_pluralize_with_count('upvote', o.upvotes_count);
      o.downvotes_s = naive_pluralize_with_count('downvote', o.downvotes_count);
      return o;
    }],
    ['tags', function(o) {
      o.url_params = {
        id   : o.id,
        name : o.name
      };
      return o;
    }, function(o) {
      o.betterifs_s = naive_pluralize_with_count('betterif', o.betterifs_count);
      o.followers_s = naive_pluralize_with_count('follower', o.followers_count);
      return o;
    }],
    ['users', function(o) {
      o.url_params = {
        id       : o.id,
        username : o.username
      };
      return o;
    }, function(o) {
      o.betterifs_s = naive_pluralize_with_count('betterif', o.betterifs_count);
      o.followers_s = naive_pluralize_with_count('follower', o.followers_count);
      o.upvotes_given_s = naive_pluralize_with_count('upvote', o.upvotes_given_count) + ' given';
      o.upvotes_received_s = naive_pluralize_with_count('upvote', o.upvotes_received_count) + ' received';
      return o;
    }]
  ];
  var kinds_length = kinds.length;
  var k;
  var s = 0;
  var cnt_more = 0;
  for (var i=kinds_length; i>0; i--) {
    k = kinds[i-1][0];
    if (!api_result[k] || !api_result[k][k]) {
      return;
    }
    s += api_result[k][k].length;
    if (api_result[k][k].length > 1) {
      cnt_more += api_result[k][k].length - 1;
    }
  }
  if (s == 0) {
    return;
  }
  api_result.cnt_more = cnt_more;
  var obj_length, url_fn, txt_fn;
  for (var i=kinds_length; i>0; i--) {
    k = kinds[i-1][0];
    if ((obj_length = api_result[k][k].length) > 0) {
      url_fn = kinds[i-1][1];
      txt_fn = kinds[i-1][2];
      for (var j=obj_length; j>0; j--) {
        if (!api_result[k][k][j-1].id) {
          return;
        }
        api_result[k][k][j-1] = url_fn(api_result[k][k][j-1]);
        api_result[k][k][j-1] = txt_fn(api_result[k][k][j-1]);
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
  return s.replace(/[^a-z0-9\-\s]/gi, '').replace(/\s+/g, '-');
}

function naive_pluralize(s, c) {
  return (parseInt(c) == 1) ? s : (s + 's');
}

function naive_pluralize_with_count(s, c) {
  return c + ' ' + naive_pluralize(s, c);
}

Handlebars.registerHelper('betterifUrl', function(params) {
  return 'http://betterific.com/' + dashed_s(params.username) + '/' + dashed_s(params.name) + '/' + params.id;
});

Handlebars.registerHelper('tagUrl', function(params) {
  return 'http://betterific.com/' + dashed_s(params.name) + '/' + params.id;
});

Handlebars.registerHelper('userUrl', function(params) {
  return 'http://betterific.com/innovator/' + dashed_s(params.username) + '/' + params.id;
});

YAHOO.util.Event.onDOMReady(function() {
  YAHOO.util.Dom.get('spice_betterific_more').on('click', function(e) {
    YAHOO.util.Dom.setStyle(YAHOO.util.Dom.getElementsByClassName('obj-wrapper'), 'display', 'block');
  });
});
