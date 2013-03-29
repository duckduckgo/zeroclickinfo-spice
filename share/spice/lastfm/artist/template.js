(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['artist'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\""
    + escapeExpression(((stack1 = depth0.url),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }

  buffer += "<div>\n    <div>\n        <div id=\"some\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.snippet),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.bio)),stack1 == null || stack1 === false ? stack1 : stack1.summary), "some", options) : helperMissing.call(depth0, "snippet", ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.bio)),stack1 == null || stack1 === false ? stack1 : stack1.summary), "some", options)))
    + "</div>\n        <a id=\"expand\" href=\"javascript:;\">\n            <span>More...</span>\n        </a>\n        <span id=\"all\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.snippet),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.bio)),stack1 == null || stack1 === false ? stack1 : stack1.summary), "all", options) : helperMissing.call(depth0, "snippet", ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.bio)),stack1 == null || stack1 === false ? stack1 : stack1.summary), "all", options)))
    + "</span>\n    </div>\n    <div>\n        <i>Similar to:</i> \n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.list),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.similar)),stack1 == null || stack1 === false ? stack1 : stack1.artist), options) : helperMissing.call(depth0, "list", ((stack1 = ((stack1 = depth0.artist),stack1 == null || stack1 === false ? stack1 : stack1.similar)),stack1 == null || stack1 === false ? stack1 : stack1.artist), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  });
})();