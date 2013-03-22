(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['alternative_to'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<a class=\"alternative_to_item highlight_zero_click1 highlight_zero_click_wrapper\" href=\"";
  if (stack1 = helpers.Url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    <div><img src=\"/iu/?u=";
  if (stack1 = helpers.IconUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.IconUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" /></div>\n    <p>";
  if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n</a>\n\n";
  return buffer;
  }

  buffer += "<div>\n\n";
  stack1 = helpers.each.call(depth0, depth0.Items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div>\n";
  return buffer;
  });
})();
