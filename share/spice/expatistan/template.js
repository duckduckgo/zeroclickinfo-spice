(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['expatistan'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function";


  if (stack1 = helpers['abstract']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['abstract']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
})();
