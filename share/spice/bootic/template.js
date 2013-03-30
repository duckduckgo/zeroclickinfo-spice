(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bootic_items'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<li class=\"ddgc_item\" data-index=\""
    + escapeExpression(((stack1 = data.index),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"> "
    + "\n    <a href=\"http://bootic.com";
  if (stack2 = helpers.url) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.url; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n        <p><img src=\"/iu/?u=";
  if (stack2 = helpers.picture_url) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.picture_url; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\"></p>\n        <span>";
  options = {hash:{
    'maxlen': ("25")
  },data:data};
  stack2 = ((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.name, options) : helperMissing.call(depth0, "condense", depth0.name, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n    </a>\n</li>";
  return buffer;
  });
})();
