(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['alternative_to'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n\n<div class=\"alternative_to_item highlight_zero_click1 highlight_zero_click_wrapper\">\n    <a href=\"";
  if (stack1 = helpers.Url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <img src=\"/iu/?u=";
  if (stack1 = helpers.IconUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.IconUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" />\n    </a>\n    <a href=\"";
  if (stack1 = helpers.Url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.shorten),stack1 ? stack1.call(depth0, depth0.Name, options) : helperMissing.call(depth0, "shorten", depth0.Name, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</a>\n</div>\n\n";
  return buffer;
  }

  buffer += "<div>\n\n";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.alts),stack1 == null || stack1 === false ? stack1 : stack1.Items), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n</div>\n";
  return buffer;
  });
})();
