(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['khan_academy_detail'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<iframe id=\"ddgc_iframe\" frameborder=\"0\" scrolling=\"no\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/";
  if (stack1 = helpers.video_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.video_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "?autoplay=1&wmode=opaque&iv_load_policy=3&autohide=1&version=3&enablejsapi=1\" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>";
  return buffer;
  });
templates['khan_academy'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<li class='ddgc_item'> "
    + "\n    <div class=\"image_wrap\">\n    	<img height='90px' src='/iu/?u=";
  if (stack1 = helpers.image_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "'>\n    </div>\n    <span>";
  options = {hash:{
    'maxlen': ("40")
  },data:data};
  stack2 = ((stack1 = helpers.condense),stack1 ? stack1.call(depth0, ((stack1 = depth0.title),stack1 == null || stack1 === false ? stack1 : stack1.$t), options) : helperMissing.call(depth0, "condense", ((stack1 = depth0.title),stack1 == null || stack1 === false ? stack1 : stack1.$t), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n</li>";
  return buffer;
  });
})();
