(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['artist'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <a href=\""
    + escapeExpression(((stack1 = depth0.url),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> \n        ";
  return buffer;
  }

  buffer += "<div>\n    <div>\n        ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.shorten),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.bio)),stack1 == null || stack1 === false ? stack1 : stack1.summary), options) : helperMissing.call(depth0, "shorten", ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.bio)),stack1 == null || stack1 === false ? stack1 : stack1.summary), options)))
    + "\n    </div>\n    <div>\n        <i>Similar to:</i> \n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.similar)),stack1 == null || stack1 === false ? stack1 : stack1.artist), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  });
})();