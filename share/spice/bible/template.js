(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bible'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n	";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " - ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.cleanText),stack1 ? stack1.call(depth0, depth0.text, options) : helperMissing.call(depth0, "cleanText", depth0.text, options)))
    + "\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n	";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.cleanText),stack1 ? stack1.call(depth0, depth0.text, options) : helperMissing.call(depth0, "cleanText", depth0.text, options)))
    + "\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.title, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
})();
