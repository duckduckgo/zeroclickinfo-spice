(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['npm'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function";


  buffer += "\n<!--  handlebars template -->\n<div>\n\n\n    <h2>";
  stack2 = ((stack1 = ((stack1 = depth0.npm),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " (";
  stack2 = ((stack1 = ((stack1 = depth0.npm),stack1 == null || stack1 === false ? stack1 : stack1.version)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")</h2>\n\n    <div id=\"npm_abstract\">\n		<div id=\"npm_package_description\">";
  stack2 = ((stack1 = ((stack1 = depth0.npm),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n		<pre id=\"npm_install_command\"> $ npm install ";
  stack2 = ((stack1 = ((stack1 = depth0.npm),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</pre>\n    </div>\n\n</div>\n";
  return buffer;
  });
})();
