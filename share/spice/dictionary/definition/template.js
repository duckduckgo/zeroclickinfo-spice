(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dictionary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n    <div>\n    	<i>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.part),stack1 ? stack1.call(depth0, depth0.partOfSpeech, options) : helperMissing.call(depth0, "part", depth0.partOfSpeech, options)))
    + "</i> \n    	<span>";
  if (stack2 = helpers.text) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.text; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n    </div>\n";
  return buffer;
  }

  buffer += "<div>\n	<b>"
    + escapeExpression(((stack1 = ((stack1 = depth0[0]),stack1 == null || stack1 === false ? stack1 : stack1.word)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> \n	<span id=\"pronunciation\"></span> \n	<i id=\"play-icon\"></i>\n</div>\n";
  stack2 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  return buffer;
  });
})();