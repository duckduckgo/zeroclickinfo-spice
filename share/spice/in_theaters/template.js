(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['in_theaters'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n            <li>\n                <a class=\"movie\" data-image=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.posters),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.links),stack1 == null || stack1 === false ? stack1 : stack1.alternate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n                    <span class=\"metadata\">(";
  if (stack2 = helpers.mpaa_rating) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.mpaa_rating; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "  -  ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.time),stack1 ? stack1.call(depth0, depth0.runtime, options) : helperMissing.call(depth0, "time", depth0.runtime, options)))
    + ") "
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.critics_rating)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.critics_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%</span>\n                </a>\n            </li>\n        ";
  return buffer;
  }

  buffer += "<div>\n    <ul class=\"showing\">\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.list),stack1 ? stack1.call(depth0, depth0.movies, options) : helperMissing.call(depth0, "list", depth0.movies, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </ul>\n</div>";
  return buffer;
  });
})();