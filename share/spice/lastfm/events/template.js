(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['events'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <li>\n            <a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a> at <a href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.venue),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.venue),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> (";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.distance),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = ((stack1 = depth0.venue),stack1 == null || stack1 === false ? stack1 : stack1.location)),stack1 == null || stack1 === false ? stack1 : stack1['geo:point'])),stack1 == null || stack1 === false ? stack1 : stack1['geo:long']), ((stack1 = ((stack1 = ((stack1 = depth0.venue),stack1 == null || stack1 === false ? stack1 : stack1.location)),stack1 == null || stack1 === false ? stack1 : stack1['geo:point'])),stack1 == null || stack1 === false ? stack1 : stack1['geo:lat']), ((stack1 = ((stack1 = depth1.events),stack1 == null || stack1 === false ? stack1 : stack1['@attr'])),stack1 == null || stack1 === false ? stack1 : stack1.location), options) : helperMissing.call(depth0, "distance", ((stack1 = ((stack1 = ((stack1 = depth0.venue),stack1 == null || stack1 === false ? stack1 : stack1.location)),stack1 == null || stack1 === false ? stack1 : stack1['geo:point'])),stack1 == null || stack1 === false ? stack1 : stack1['geo:long']), ((stack1 = ((stack1 = ((stack1 = depth0.venue),stack1 == null || stack1 === false ? stack1 : stack1.location)),stack1 == null || stack1 === false ? stack1 : stack1['geo:point'])),stack1 == null || stack1 === false ? stack1 : stack1['geo:lat']), ((stack1 = ((stack1 = depth1.events),stack1 == null || stack1 === false ? stack1 : stack1['@attr'])),stack1 == null || stack1 === false ? stack1 : stack1.location), options)))
    + ") - ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.date),stack1 ? stack1.call(depth0, depth0.startDate, options) : helperMissing.call(depth0, "date", depth0.startDate, options)))
    + "\n        </li>\n    ";
  return buffer;
  }

  buffer += "<div>\n    ";
  options = {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data};
  stack2 = ((stack1 = helpers.list),stack1 ? stack1.call(depth0, ((stack1 = depth0.events),stack1 == null || stack1 === false ? stack1 : stack1.event), options) : helperMissing.call(depth0, "list", ((stack1 = depth0.events),stack1 == null || stack1 === false ? stack1 : stack1.event), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>";
  return buffer;
  });
})();