(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['forvo'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div class=\"forvo_container\">\n            <audio preload=\"none\">\n                <source src=\"/audio/?u="
    + escapeExpression(((stack1 = ((stack1 = depth0.standard_pronunciation),stack1 == null || stack1 === false ? stack1 : stack1.pathmp3)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"audio/mpeg\">\n            </audio>\n            <div class=\"forvo_track_details\">\n                <span>";
  if (stack2 = helpers.original) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.original; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n            </div>\n        </div>\n    ";
  return buffer;
  }

  buffer += "<div>\n    ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });
})();