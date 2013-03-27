(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dictionary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div>\n    	<i>";
  if (stack1 = helpers.part) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.part; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</i> \n    	<span>";
  if (stack1 = helpers.definition) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.definition; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </div>\n";
  return buffer;
  }

  buffer += "<div>\n	<b>";
  if (stack1 = helpers.word) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.word; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</b> \n	<span id=\"pronunciation\"></span> \n	<i id=\"play-icon\"></i>\n</div>\n";
  stack1 = helpers.each.call(depth0, depth0.words, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });
})();