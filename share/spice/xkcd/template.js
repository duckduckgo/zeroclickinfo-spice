(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['xkcd'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<img src=\"/iu/?u=";
  if (stack1 = helpers.img) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.img; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"img_zero_click_big\" alt=\"";
  if (stack1 = helpers.alt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.alt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n<a href=\"/?q=xkcd+";
  if (stack1 = helpers.num) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Prev</a>\n";
  return buffer;
  });
})();
